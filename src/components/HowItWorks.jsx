import React from 'react';
import { Search, FileText, HeartHandshake, Home } from 'lucide-react';

export default function HowItWorks() {
  const steps = [
    {
      number: '01',
      icon: <Search size={26} />,
      title: 'Encontre o Pet Ideal',
      description: 'Navegue pelo nosso catálogo filtrando por porte, espécie e energia para achar o companheiro que mais combina com seu estilo de vida.'
    },
    {
      number: '02',
      icon: <FileText size={26} />,
      title: 'Preencha o Formulário',
      description: 'Envie sua proposta de adoção para entendermos a dinâmica do seu lar, garantindo a segurança e o bem-estar de todos.'
    },
    {
      number: '03',
      icon: <HeartHandshake size={26} />,
      title: 'Entrevista & Visita',
      description: 'Nossa equipe conversa com você pelo WhatsApp e agendamos um encontro emocionante para você e o pet se conhecerem de pertinho.'
    },
    {
      number: '04',
      icon: <Home size={26} />,
      title: 'Novo Membro da Família',
      description: 'Assinatura do termo de posse responsável, recebimento da carteirinha de vacinação e o início de uma linda amizade para toda a vida!'
    }
  ];

  return (
    <section id="como-funciona" className="how-it-works-section" aria-labelledby="how-it-works-title">
      <div className="container">
        <header className="section-header">
          <span className="section-tag">Passo a Passo</span>
          <h2 id="how-it-works-title" className="section-title">
            Como funciona o processo de adoção?
          </h2>
          <p className="section-description">
            Nosso processo é simples, humanizado e focado em garantir que tanto o animalzinho quanto o tutor tenham uma experiência de vida incrível.
          </p>
        </header>

        <div className="steps-grid">
          {steps.map((step, idx) => (
            <article key={idx} className="step-card">
              <span className="step-number-badge">{step.number}</span>
              <div className="step-icon-wrapper">
                {step.icon}
              </div>
              <h3 className="step-title">{step.title}</h3>
              <p className="step-text">{step.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
