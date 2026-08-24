// The endpoint must be a backend proxy that holds the model credentials. Anything
// in REACT_APP_* is inlined into the public bundle at build time, so a provider
// API key can never live on this side of the wire.
export const ASK_ENDPOINT = process.env.REACT_APP_ASK_API_URL || '/api/ask';

export const MAX_QUESTION_LENGTH = 500;

const REQUEST_TIMEOUT_MS = 30000;

const ERRORS = {
    empty: 'Type a question first.',
    network: "Couldn't reach the server. Check your connection and try again.",
    timeout: 'That took too long to answer. Please try again.',
    rateLimited: 'Too many questions at once — give it a few seconds.',
    failed: "That request didn't go through. Please try again.",
    unreadable: 'Got an unexpected response from the server.',
    blank: 'No answer came back for that one. Try rephrasing it?',
};

// Accepts the common answer shapes so this works against a hand-rolled proxy or an
// OpenAI-compatible passthrough without changing the component.
const readAnswer = (payload) => {
    if (typeof payload === 'string') {
        return payload;
    }

    if (!payload || typeof payload !== 'object') {
        return '';
    }

    const direct = payload.answer ?? payload.reply ?? payload.message ?? payload.text;
    if (typeof direct === 'string') {
        return direct;
    }

    const choice = Array.isArray(payload.choices) ? payload.choices[0] : null;
    const fromChoice = choice?.message?.content ?? choice?.text;

    return typeof fromChoice === 'string' ? fromChoice : '';
};

export async function askQuestion(question, { signal } = {}) {
    const prompt = String(question ?? '')
        .trim()
        .slice(0, MAX_QUESTION_LENGTH);

    if (!prompt) {
        throw new Error(ERRORS.empty);
    }

    const controller = new AbortController();
    const forwardAbort = () => controller.abort();
    signal?.addEventListener('abort', forwardAbort, { once: true });

    let timedOut = false;
    const timer = setTimeout(() => {
        timedOut = true;
        controller.abort();
    }, REQUEST_TIMEOUT_MS);

    try {
        const response = await fetch(ASK_ENDPOINT, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
            body: JSON.stringify({ question: prompt }),
            signal: controller.signal,
        });


        if (!response.ok) {
            throw new Error(response.status === 429 ? ERRORS.rateLimited : ERRORS.failed);
        }

        let payload;
        try {
            payload = await response.json();
        } catch {
            throw new Error(ERRORS.unreadable);
        }

        const answer = readAnswer(payload).trim();
        if (!answer) {
            throw new Error(ERRORS.blank);
        }

        return answer;
    } catch (error) {
        if (timedOut) {
            throw new Error(ERRORS.timeout);
        }
        // Callers check for AbortError to drop answers they no longer care about.
        if (error?.name === 'AbortError') {
            throw error;
        }
        // fetch only rejects with TypeError when the request never reached the server.
        throw error instanceof TypeError ? new Error(ERRORS.network) : error;
    } finally {
        clearTimeout(timer);
        signal?.removeEventListener('abort', forwardAbort);
    }
}
