import React from 'react';
import { FAQ_DATA } from '../data/pets';
import { HelpCircle, ChevronDown } from 'lucide-react';

export default function FaqSection() {
  return (
    <section id="duvidas" className="faq-section" aria-labelledby="faq-title">
      <div className="container">
        <header className="section-header">
          <span className="section-tag">
            <HelpCircle size={14} /> Tire suas Dúvidas
          </span>
          <h2 id="faq-title" className="section-title">
            Perguntas Frequentes
          </h2>
          <p className="section-description">
            Tudo o que você precisa saber antes de dar esse passo transformador na sua vida e na do animal.
          </p>
        </header>

        <div className="faq-list">
          {FAQ_DATA.map((item, idx) => (
            <details key={idx} className="faq-details">
              <summary className="faq-summary">
                <span>{item.question}</span>
                <ChevronDown size={20} className="faq-arrow-icon" aria-hidden="true" />
              </summary>
              <div className="faq-answer">
                <p>{item.answer}</p>
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
