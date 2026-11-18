import React, { useState, useEffect } from 'react';
import { X, CheckCircle, Send, ShieldAlert, Heart } from 'lucide-react';

export default function AdoptionFormModal({ pet, onClose, onSubmitSuccess }) {
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    city: '',
    residenceType: 'apartamento',
    hasNets: 'sim',
    hasOtherPets: 'sim',
    experience: '',
    agreeTerms: false
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && !isSubmitting) onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [onClose, isSubmitting]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.fullName.trim()) newErrors.fullName = 'Por favor, informe seu nome completo.';
    if (!formData.phone.trim()) newErrors.phone = 'Informe seu número de WhatsApp com DDD.';
    if (!formData.email.trim() || !formData.email.includes('@')) newErrors.email = 'E-mail válido obrigatório.';
    if (!formData.city.trim()) newErrors.city = 'Informe sua cidade e bairro.';
    if (!formData.agreeTerms) newErrors.agreeTerms = 'Você deve concordar com o termo de posse responsável.';
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsSubmitting(true);
    // Simulating API latency
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      if (onSubmitSuccess) {
        onSubmitSuccess(pet ? pet.name : 'animal', formData.fullName);
      }
    }, 900);
  };

  return (
    <div className="modal-backdrop" onClick={onClose} role="presentation">
      <div 
        className="modal-card modal-large" 
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="form-dialog-title"
      >
        <button 
          type="button" 
          className="modal-close-btn" 
          onClick={onClose}
          aria-label="Fechar formulário"
        >
          <X size={20} />
        </button>

        <div className="modal-content">
          {isSubmitted ? (
            <div style={{ textAlign: 'center', padding: '2.5rem 1rem' }}>
              <div style={{ width: 68, height: 68, background: '#DCFCE7', color: '#16A34A', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem' }}>
                <CheckCircle size={38} />
              </div>
              <h2 style={{ fontSize: '1.6rem', color: 'var(--color-dark)', marginBottom: '0.75rem' }}>
                Proposta de Adoção Enviada!
              </h2>
              <p style={{ color: 'var(--color-muted)', fontSize: '1rem', maxWidth: 480, margin: '0 auto 1.5rem', lineHeight: 1.6 }}>
                Muito obrigado por querer dar um novo lar para o(a) <strong>{pet?.name}</strong>! Nossa equipe voluntária analisará seus dados e entrará em contato via WhatsApp no número <strong>{formData.phone}</strong> em até 48 horas.
              </p>
              <button 
                type="button" 
                className="btn btn-primary"
                onClick={onClose}
              >
                Entendido, Concluir
              </button>
            </div>
          ) : (
            <>
              <header style={{ marginBottom: '1.75rem' }}>
                <span className="section-tag">
                  <Heart size={14} /> Formulário de Interesse
                </span>
                <h2 id="form-dialog-title" style={{ fontSize: '1.5rem', color: 'var(--color-dark)', marginTop: '0.25rem' }}>
                  Adoção Responsável: {pet ? pet.name : 'Novo Amigo'}
                </h2>
                <p style={{ color: 'var(--color-muted)', fontSize: '0.9rem' }}>
                  Preencha as informações abaixo para iniciarmos o processo de triagem e acolhimento.
                </p>
              </header>

              <form className="adoption-form" onSubmit={handleSubmit}>
                <fieldset className="form-fieldset">
                  <legend className="form-legend">1. Seus Dados de Contato</legend>
                  
                  <div className="form-row">
                    <div className="form-field">
                      <label htmlFor="fullName" className="form-label">Nome Completo *</label>
                      <input
                        type="text"
                        id="fullName"
                        name="fullName"
                        className="form-input"
                        placeholder="Ex: Ana Maria dos Santos"
                        value={formData.fullName}
                        onChange={handleChange}
                        required
                      />
                      {errors.fullName && <span style={{ color: 'var(--color-danger)', fontSize: '0.75rem' }}>{errors.fullName}</span>}
                    </div>

                    <div className="form-field">
                      <label htmlFor="phone" className="form-label">WhatsApp com DDD *</label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        className="form-input"
                        placeholder="(11) 98765-4321"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                      />
                      {errors.phone && <span style={{ color: 'var(--color-danger)', fontSize: '0.75rem' }}>{errors.phone}</span>}
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-field">
                      <label htmlFor="email" className="form-label">E-mail Principal *</label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        className="form-input"
                        placeholder="voce@email.com"
                        value={formData.email}
                        onChange={handleChange}
                        required
                      />
                      {errors.email && <span style={{ color: 'var(--color-danger)', fontSize: '0.75rem' }}>{errors.email}</span>}
                    </div>

                    <div className="form-field">
                      <label htmlFor="city" className="form-label">Cidade e Bairro *</label>
                      <input
                        type="text"
                        id="city"
                        name="city"
                        className="form-input"
                        placeholder="Ex: São Paulo - Pinheiros"
                        value={formData.city}
                        onChange={handleChange}
                        required
                      />
                      {errors.city && <span style={{ color: 'var(--color-danger)', fontSize: '0.75rem' }}>{errors.city}</span>}
                    </div>
                  </div>
                </fieldset>

                <fieldset className="form-fieldset">
                  <legend className="form-legend">2. Ambiente e Moradia</legend>
                  
                  <div className="form-row">
                    <div className="form-field">
                      <label htmlFor="residenceType" className="form-label">Tipo de Residência</label>
                      <select
                        id="residenceType"
                        name="residenceType"
                        className="form-select"
                        value={formData.residenceType}
                        onChange={handleChange}
                      >
                        <option value="apartamento">Apartamento</option>
                        <option value="casa_com_quintal">Casa com quintal telado/murado</option>
                        <option value="casa_sem_quintal">Casa sem quintal</option>
                        <option value="sitio_chacara">Chácara / Sítio</option>
                      </select>
                    </div>

                    <div className="form-field">
                      <label htmlFor="hasNets" className="form-label">Possui redes/telas de proteção?</label>
                      <select
                        id="hasNets"
                        name="hasNets"
                        className="form-select"
                        value={formData.hasNets}
                        onChange={handleChange}
                      >
                        <option value="sim">Sim, todas as janelas/sacadas têm rede</option>
                        <option value="em_instalacao">Em processo de instalação</option>
                        <option value="nao">Não possui no momento</option>
                      </select>
                    </div>
                  </div>

                  <div className="form-field">
                    <label htmlFor="hasOtherPets" className="form-label">Você já tem outros animais na casa?</label>
                    <select
                      id="hasOtherPets"
                      name="hasOtherPets"
                      className="form-select"
                      value={formData.hasOtherPets}
                      onChange={handleChange}
                    >
                      <option value="sim">Sim, já tenho cães ou gatos</option>
                      <option value="nao">Não, este será o primeiro pet</option>
                    </select>
                  </div>

                  <div className="form-field">
                    <label htmlFor="experience" className="form-label">Conte um pouco sobre sua rotina e experiência com pets</label>
                    <textarea
                      id="experience"
                      name="experience"
                      className="form-textarea"
                      rows="3"
                      placeholder="Quem mora com você? Quanto tempo o pet ficará sozinho? Você já cuidou de pets antes?"
                      value={formData.experience}
                      onChange={handleChange}
                    ></textarea>
                  </div>
                </fieldset>

                <div style={{ margin: '0.5rem 0' }}>
                  <label className="form-checkbox-label">
                    <input
                      type="checkbox"
                      name="agreeTerms"
                      checked={formData.agreeTerms}
                      onChange={handleChange}
                    />
                    <span>
                      Declaro ser maior de 21 anos e estou ciente de que a adoção de um animal é um compromisso de 10 a 18 anos, exigindo cuidados veterinários, alimentação de qualidade e amor contínuo.
                    </span>
                  </label>
                  {errors.agreeTerms && (
                    <p style={{ color: 'var(--color-danger)', fontSize: '0.8rem', marginTop: '0.35rem' }}>
                      {errors.agreeTerms}
                    </p>
                  )}
                </div>

                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '0.5rem' }}>
                  <button 
                    type="button" 
                    className="btn btn-outline" 
                    onClick={onClose}
                    disabled={isSubmitting}
                  >
                    Cancelar
                  </button>
                  <button 
                    type="submit" 
                    className="btn btn-primary"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Enviando Proposta...' : (
                      <>
                        <Send size={16} /> Enviar Proposta de Adoção
                      </>
                    )}
                  </button>
                </div>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
