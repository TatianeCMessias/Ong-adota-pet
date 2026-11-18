import React, { useState, useEffect } from 'react';
import { X, Plus, FileSpreadsheet, Download, Check, Sparkles, Image, PawPrint } from 'lucide-react';

export default function PetRegisterModal({ onClose, onAddPet, onNotify }) {
  const [formData, setFormData] = useState({
    name: '',
    species: 'dog',
    breed: 'Vira-lata (SRD)',
    gender: 'Macho',
    size: 'Médio',
    sizeCode: 'medium',
    age: 'Jovem (1 ano)',
    ageMonths: 12,
    weight: '12 kg',
    color: 'Caramelo',
    location: 'São Paulo, SP',
    castrated: true,
    vaccinated: true,
    dewormed: true,
    specialNeeds: false,
    specialNeedsDescription: '',
    personalityInput: 'Dócil, Brincalhão, Carinhoso',
    imageUrl: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=800&q=80',
    description: '',
    isUrgent: false
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [onClose]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    let val = type === 'checkbox' ? checked : value;

    if (name === 'size') {
      let code = 'medium';
      if (value === 'Pequeno') code = 'small';
      if (value === 'Grande') code = 'large';
      setFormData(prev => ({ ...prev, size: value, sizeCode: code }));
      return;
    }

    if (name === 'species') {
      const defaultImg = value === 'dog' 
        ? 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=800&q=80'
        : 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=800&q=80';
      setFormData(prev => ({ 
        ...prev, 
        species: value,
        imageUrl: prev.imageUrl.includes('unsplash') ? defaultImg : prev.imageUrl 
      }));
      return;
    }

    setFormData(prev => ({ ...prev, [name]: val }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: null }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      setErrors({ name: 'O nome do animal é obrigatório.' });
      return;
    }

    const personalityArray = formData.personalityInput
      .split(',')
      .map(s => s.trim())
      .filter(Boolean);

    const newPet = {
      id: `pet-${Date.now()}`,
      name: formData.name.trim(),
      species: formData.species,
      speciesLabel: formData.species === 'dog' ? 'Cachorro' : 'Gato',
      breed: formData.breed.trim() || 'Vira-lata (SRD)',
      gender: formData.gender,
      age: formData.age,
      ageMonths: Number(formData.ageMonths) || 12,
      size: formData.size,
      sizeCode: formData.sizeCode,
      location: formData.location.trim() || 'São Paulo, SP',
      weight: formData.weight.trim() || '10 kg',
      color: formData.color.trim() || 'Caramelo',
      castrated: formData.castrated,
      vaccinated: formData.vaccinated,
      dewormed: formData.dewormed,
      specialNeeds: formData.specialNeeds,
      specialNeedsDescription: formData.specialNeedsDescription,
      personality: personalityArray.length > 0 ? personalityArray : ['Dócil', 'Amoroso'],
      imageUrl: formData.imageUrl || 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&w=800&q=80',
      description: formData.description.trim() || `O(A) ${formData.name} foi resgatado com muito amor e agora procura um lar definitivo para ser feliz!`,
      rescueDate: new Date().toISOString().split('T')[0],
      isUrgent: formData.isUrgent
    };

    onAddPet(newPet);
    if (onNotify) {
      onNotify(`Pet "${newPet.name}" cadastrado com sucesso no sistema! 🎉`, 'success');
    }
    onClose();
  };

  return (
    <div className="modal-backdrop" onClick={onClose} role="presentation">
      <div 
        className="modal-card modal-large" 
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="register-dialog-title"
      >
        <button 
          type="button" 
          className="modal-close-btn" 
          onClick={onClose}
          aria-label="Fechar cadastro"
        >
          <X size={20} />
        </button>

        <div className="modal-content">
          <header style={{ marginBottom: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '0.75rem' }}>
            <div>
              <span className="section-tag">
                <PawPrint size={14} /> Gestão da ONG
              </span>
              <h2 id="register-dialog-title" style={{ fontSize: '1.5rem', color: 'var(--color-dark)', marginTop: '0.25rem' }}>
                Cadastrar Novo Pet para Adoção
              </h2>
              <p style={{ color: 'var(--color-muted)', fontSize: '0.9rem' }}>
                Adicione o animal ao catálogo do site ou baixe a planilha completa de controle.
              </p>
            </div>

            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
              <a 
                href="/planilha-cadastro-pets.xlsx" 
                download="planilha-cadastro-pets.xlsx"
                className="btn btn-outline btn-sm"
                title="Baixar Planilha Excel Oficial"
              >
                <FileSpreadsheet size={16} /> Baixar Excel (.xlsx)
              </a>
              <a 
                href="/planilha-cadastro-pets.csv" 
                download="planilha-cadastro-pets.csv"
                className="btn btn-outline btn-sm"
                title="Baixar em formato CSV"
              >
                <Download size={16} /> Baixar CSV
              </a>
            </div>
          </header>

          <form className="adoption-form" onSubmit={handleSubmit}>
            {/* Fieldset 1: Dados Principais */}
            <fieldset className="form-fieldset">
              <legend className="form-legend">1. Informações Básicas do Animal</legend>
              
              <div className="form-row">
                <div className="form-field">
                  <label htmlFor="reg-name" className="form-label">Nome do Pet *</label>
                  <input
                    type="text"
                    id="reg-name"
                    name="name"
                    className="form-input"
                    placeholder="Ex: Paçoca, Mel, Fred..."
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                  {errors.name && <span style={{ color: 'var(--color-danger)', fontSize: '0.75rem' }}>{errors.name}</span>}
                </div>

                <div className="form-field">
                  <label htmlFor="reg-species" className="form-label">Espécie *</label>
                  <select
                    id="reg-species"
                    name="species"
                    className="form-select"
                    value={formData.species}
                    onChange={handleChange}
                  >
                    <option value="dog">🐶 Cachorro</option>
                    <option value="cat">🐱 Gato</option>
                  </select>
                </div>
              </div>

              <div className="form-row">
                <div className="form-field">
                  <label htmlFor="reg-breed" className="form-label">Raça</label>
                  <input
                    type="text"
                    id="reg-breed"
                    name="breed"
                    className="form-input"
                    placeholder="Ex: Vira-lata (SRD), Poodle..."
                    value={formData.breed}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-field">
                  <label htmlFor="reg-gender" className="form-label">Sexo</label>
                  <select
                    id="reg-gender"
                    name="gender"
                    className="form-select"
                    value={formData.gender}
                    onChange={handleChange}
                  >
                    <option value="Macho">Macho</option>
                    <option value="Fêmea">Fêmea</option>
                  </select>
                </div>
              </div>

              <div className="form-row">
                <div className="form-field">
                  <label htmlFor="reg-size" className="form-label">Porte</label>
                  <select
                    id="reg-size"
                    name="size"
                    className="form-select"
                    value={formData.size}
                    onChange={handleChange}
                  >
                    <option value="Pequeno">Pequeno (até 10kg)</option>
                    <option value="Médio">Médio (10 a 25kg)</option>
                    <option value="Grande">Grande (acima de 25kg)</option>
                  </select>
                </div>

                <div className="form-field">
                  <label htmlFor="reg-age" className="form-label">Idade Estimada</label>
                  <input
                    type="text"
                    id="reg-age"
                    name="age"
                    className="form-input"
                    placeholder="Ex: 8 meses, 2 anos, Idoso (9 anos)..."
                    value={formData.age}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-field">
                  <label htmlFor="reg-color" className="form-label">Cor / Pelagem</label>
                  <input
                    type="text"
                    id="reg-color"
                    name="color"
                    className="form-input"
                    placeholder="Ex: Caramelo e Branco, Preto..."
                    value={formData.color}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-field">
                  <label htmlFor="reg-weight" className="form-label">Peso Aproximado</label>
                  <input
                    type="text"
                    id="reg-weight"
                    name="weight"
                    className="form-input"
                    placeholder="Ex: 14 kg"
                    value={formData.weight}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </fieldset>

            {/* Fieldset 2: Saúde e Procedimentos */}
            <fieldset className="form-fieldset">
              <legend className="form-legend">2. Saúde e Prontuário</legend>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '0.85rem' }}>
                <label className="form-checkbox-label">
                  <input
                    type="checkbox"
                    name="castrated"
                    checked={formData.castrated}
                    onChange={handleChange}
                  />
                  <span>Castrado(a)</span>
                </label>

                <label className="form-checkbox-label">
                  <input
                    type="checkbox"
                    name="vaccinated"
                    checked={formData.vaccinated}
                    onChange={handleChange}
                  />
                  <span>Vacinas em dia</span>
                </label>

                <label className="form-checkbox-label">
                  <input
                    type="checkbox"
                    name="dewormed"
                    checked={formData.dewormed}
                    onChange={handleChange}
                  />
                  <span>Vermifugado(a)</span>
                </label>

                <label className="form-checkbox-label">
                  <input
                    type="checkbox"
                    name="isUrgent"
                    checked={formData.isUrgent}
                    onChange={handleChange}
                  />
                  <span style={{ color: 'var(--color-danger)', fontWeight: 600 }}>Adoção Urgente</span>
                </label>
              </div>

              <div style={{ marginTop: '0.5rem' }}>
                <label className="form-checkbox-label">
                  <input
                    type="checkbox"
                    name="specialNeeds"
                    checked={formData.specialNeeds}
                    onChange={handleChange}
                  />
                  <span>Animal possui necessidade ou cuidado especial</span>
                </label>
                {formData.specialNeeds && (
                  <input
                    type="text"
                    name="specialNeedsDescription"
                    className="form-input"
                    style={{ marginTop: '0.5rem' }}
                    placeholder="Ex: Tratamento contínuo de colírio, amputação de pata, etc."
                    value={formData.specialNeedsDescription}
                    onChange={handleChange}
                  />
                )}
              </div>
            </fieldset>

            {/* Fieldset 3: Foto, História e Temperamento */}
            <fieldset className="form-fieldset">
              <legend className="form-legend">3. Temperamento e História</legend>

              <div className="form-field">
                <label htmlFor="reg-personality" className="form-label">
                  Temperamento (separar características por vírgula)
                </label>
                <input
                  type="text"
                  id="reg-personality"
                  name="personalityInput"
                  className="form-input"
                  placeholder="Ex: Dócil, Calmo, Sociável com outros cães, Brincalhão"
                  value={formData.personalityInput}
                  onChange={handleChange}
                />
              </div>

              <div className="form-field">
                <label htmlFor="reg-image" className="form-label">Link da Foto (URL)</label>
                <input
                  type="url"
                  id="reg-image"
                  name="imageUrl"
                  className="form-input"
                  placeholder="https://..."
                  value={formData.imageUrl}
                  onChange={handleChange}
                />
              </div>

              <div className="form-field">
                <label htmlFor="reg-desc" className="form-label">História do Resgate / Descrição</label>
                <textarea
                  id="reg-desc"
                  name="description"
                  className="form-textarea"
                  rows="3"
                  placeholder="Conte como ele foi resgatado e como é a convivência dele no abrigo..."
                  value={formData.description}
                  onChange={handleChange}
                ></textarea>
              </div>
            </fieldset>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '0.5rem' }}>
              <button 
                type="button" 
                className="btn btn-outline" 
                onClick={onClose}
              >
                Cancelar
              </button>
              <button 
                type="submit" 
                className="btn btn-primary"
              >
                <Plus size={18} /> Salvar e Cadastrar Pet
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
