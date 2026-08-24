import React, { useCallback, useEffect, useId, useRef, useState } from 'react';
import { GlassCard } from 'react-glass-ui';
import './AskBar.css';
import { askQuestion, MAX_QUESTION_LENGTH } from '../utils/askApi';
import { askBar as copy } from '../utils/constant';

// Mirrors the UIGlassButton tokens so every glass surface reads as one family.
// flexibility 0 keeps the panel from drifting under the cursor while text is being read.
const glassPanel = {
    blur: 3,
    distortion: 30,
    saturation: 140,
    brightness: 106,
    borderRadius: 28,
    borderSize: 0,
    borderOpacity: 0,
    backgroundColor: '#8b7dff',
    backgroundOpacity: 0.08,
    innerLightBlur: 14,
    innerLightSpread: 1,
    innerLightColor: '#a5b4fc',
    innerLightOpacity: 0.2,
    outerLightBlur: 22,
    outerLightSpread: 0,
    outerLightColor: '#7c5cff',
    outerLightOpacity: 0.16,
    flexibility: 0,
    onHoverScale: 1,
    padding: '0',
    width: '100%',
    color: '#fff',
};

const SearchIcon = () => (
    <svg className="ask-bar-search-icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        <circle cx="11" cy="11" r="7" fill="none" stroke="currentColor" strokeWidth="2" />
        <line x1="16.5" y1="16.5" x2="21" y2="21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
);

const SubmitIcon = () => (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        <line x1="12" y1="19" x2="12" y2="5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <polyline
            points="6 11 12 5 18 11"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </svg>
);

function AskBar({ className = '', suggestions = copy.suggestions }) {
    const panelId = useId();
    const [query, setQuery] = useState('');
    const [question, setQuestion] = useState('');
    const [answer, setAnswer] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [status, setStatus] = useState('idle');
    const [panelHeight, setPanelHeight] = useState(0);

    const inputRef = useRef(null);
    const panelRef = useRef(null);
    const abortRef = useRef(null);

    const isOpen = status !== 'idle';
    const isLoading = status === 'loading';

    // The panel is always mounted so it can be measured; the wrapper animates to that
    // height, which keeps the card in step with however much text an answer contains.
    useEffect(() => {
        const node = panelRef.current;
        if (!node) {
            return undefined;
        }

        if (!isOpen) {
            setPanelHeight(0);
            return undefined;
        }

        // Fractional height, so a descender never gets clipped by the rounding scrollHeight does.
        const measure = () => setPanelHeight(node.getBoundingClientRect().height);
        measure();

        const observer = new ResizeObserver(measure);
        observer.observe(node);

        return () => observer.disconnect();
    }, [isOpen]);

    useEffect(() => () => abortRef.current?.abort(), []);

    const collapse = useCallback(() => {
        abortRef.current?.abort();
        abortRef.current = null;
        setStatus('idle');
        setQuestion('');
        setAnswer('');
        setErrorMessage('');
    }, []);

    const runQuery = useCallback(async (rawQuestion) => {
        const prompt = rawQuestion.trim();
        if (!prompt) {
            inputRef.current?.focus();
            return;
        }

        abortRef.current?.abort();
        const controller = new AbortController();
        abortRef.current = controller;

        setQuestion(prompt);
        setAnswer('');
        setErrorMessage('');
        setStatus('loading');

        try {
            const reply = await askQuestion(prompt, { signal: controller.signal });
            // Escape or a newer question can land while this one is in flight.
            if (controller.signal.aborted) {
                return;
            }
            setAnswer(reply);
            setStatus('answer');
        } catch (error) {
            if (controller.signal.aborted) {
                return;
            }
            setErrorMessage(error.message);
            setStatus('error');
        } finally {
            if (abortRef.current === controller) {
                abortRef.current = null;
            }
        }
    }, []);

    const onSubmit = (event) => {
        event.preventDefault();
        runQuery(query);
    };

    const onKeyDown = (event) => {
        if (event.key !== 'Escape') {
            return;
        }
        if (isOpen) {
            collapse();
        } else {
            setQuery('');
        }
    };

    const onClear = () => {
        setQuery('');
        collapse();
        inputRef.current?.focus();
    };

    const onSuggestion = (suggestion) => {
        setQuery(suggestion);
        runQuery(suggestion);
    };

    const hasContent = query.trim().length > 0;

    return (
        <div className={`ask-bar ${className}`}>
            <GlassCard
                {...glassPanel}
                className="ask-bar-card"
                contentClassName="ask-bar-card-content"
            >
                <form className="ask-bar-form" role="search" onSubmit={onSubmit}>
                    <SearchIcon />
                    <label className="ask-bar-visually-hidden" htmlFor={`${panelId}-input`}>
                        {copy.label}
                    </label>
                    <input
                        id={`${panelId}-input`}
                        ref={inputRef}
                        className="ask-bar-input"
                        type="text"
                        value={query}
                        placeholder={copy.placeholder}
                        maxLength={MAX_QUESTION_LENGTH}
                        autoComplete="off"
                        spellCheck="false"
                        aria-controls={panelId}
                        onChange={(event) => setQuery(event.target.value)}
                        onKeyDown={onKeyDown}
                    />
                    {(hasContent || isOpen) && (
                        <button
                            type="button"
                            className="ask-bar-clear"
                            onClick={onClear}
                            aria-label={copy.clear}
                        >
                            &times;
                        </button>
                    )}
                    <button
                        type="submit"
                        className="ask-bar-submit"
                        disabled={!hasContent || isLoading}
                        aria-label={copy.submit}
                    >
                        <SubmitIcon />
                    </button>
                </form>

                <div
                    id={panelId}
                    className={`ask-bar-panel ${isOpen ? 'is-open' : ''}`}
                    style={{ height: panelHeight }}
                    aria-hidden={!isOpen}
                >
                    <div className="ask-bar-panel-inner" ref={panelRef}>
                        <p className="ask-bar-question">{question}</p>

                        <div className="ask-bar-body" aria-live="polite">
                            {isLoading && (
                                <p className="ask-bar-thinking">
                                    {copy.thinking}
                                    <span className="ask-bar-dots" aria-hidden="true">
                                        <span />
                                        <span />
                                        <span />
                                    </span>
                                </p>
                            )}
                            {status === 'answer' && <p className="ask-bar-answer">{answer}</p>}
                            {status === 'error' && (
                                <p className="ask-bar-error" role="alert">
                                    {errorMessage}
                                </p>
                            )}
                        </div>

                        {status === 'answer' && <p className="ask-bar-disclaimer">{copy.disclaimer}</p>}
                        {status === 'error' && (
                            <button type="button" className="ask-bar-retry" onClick={() => runQuery(question)}>
                                {copy.retry}
                            </button>
                        )}
                    </div>
                </div>
            </GlassCard>

            {suggestions?.length > 0 && (
                <div className="ask-bar-chips">
                    {suggestions.map((suggestion) => (
                        <button
                            key={suggestion}
                            type="button"
                            className="ask-bar-chip"
                            onClick={() => onSuggestion(suggestion)}
                            disabled={isLoading}
                        >
                            {suggestion}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}

export default AskBar;
