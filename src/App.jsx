import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import PetGrid from './components/PetGrid';
import HowItWorks from './components/HowItWorks';
import StoriesSection from './components/StoriesSection';
import DonationSection from './components/DonationSection';
import FaqSection from './components/FaqSection';
import Footer from './components/Footer';
import PetModal from './components/PetModal';
import AdoptionFormModal from './components/AdoptionFormModal';
import PetRegisterModal from './components/PetRegisterModal';
import Toast from './components/Toast';
import { PETS_DATA } from './data/pets';

export default function App() {
  const [pets, setPets] = useState(() => {
    try {
      const saved = localStorage.getItem('adota_pet_list');
      return saved ? JSON.parse(saved) : PETS_DATA;
    } catch {
      return PETS_DATA;
    }
  });

  const [favorites, setFavorites] = useState(() => {
    try {
      const saved = localStorage.getItem('adota_pet_favorites');
      return saved ? JSON.parse(saved) : ['pet-1'];
    } catch {
      return ['pet-1'];
    }
  });

  const [selectedPetForDetails, setSelectedPetForDetails] = useState(null);
  const [selectedPetForAdoption, setSelectedPetForAdoption] = useState(null);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [toasts, setToasts] = useState([]);

  // Save custom pets to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('adota_pet_list', JSON.stringify(pets));
    } catch (e) {
      console.warn('Não foi possível persistir pets:', e);
    }
  }, [pets]);

  // Save favorites to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('adota_pet_favorites', JSON.stringify(favorites));
    } catch (e) {
      console.warn('Não foi possível persistir favoritos:', e);
    }
  }, [favorites]);

  const addToast = (message, type = 'success') => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  };

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const handleToggleFavorite = (petId) => {
    const pet = pets.find(p => p.id === petId);
    setFavorites((prev) => {
      const exists = prev.includes(petId);
      if (exists) {
        addToast(`${pet ? pet.name : 'Pet'} removido dos seus favoritos`, 'info');
        return prev.filter((id) => id !== petId);
      } else {
        addToast(`${pet ? pet.name : 'Pet'} salvo nos seus favoritos com amor! ❤️`, 'success');
        return [...prev, petId];
      }
    });
  };

  const handleOpenAdoption = (pet) => {
    setSelectedPetForAdoption(pet);
  };

  const handleAddPet = (newPet) => {
    setPets((prev) => [newPet, ...prev]);
  };

  const handleScrollToDonations = () => {
    const element = document.getElementById('doacoes');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleScrollToCatalog = () => {
    const element = document.getElementById('catalogo');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <Header 
        onOpenDonation={handleScrollToDonations} 
        onOpenRegister={() => setIsRegisterOpen(true)}
      />

      <main id="conteudo-principal">
        <Hero 
          onExploreClick={handleScrollToCatalog}
          onDonationClick={handleScrollToDonations}
        />

        <PetGrid
          pets={pets}
          favorites={favorites}
          onToggleFavorite={handleToggleFavorite}
          onViewDetails={setSelectedPetForDetails}
          onAdopt={handleOpenAdoption}
          onOpenRegister={() => setIsRegisterOpen(true)}
        />

        <HowItWorks />

        <StoriesSection />

        <DonationSection onNotify={addToast} />

        <FaqSection />
      </main>

      <Footer onNotify={addToast} />

      {/* Detalhes do Pet em Modal */}
      {selectedPetForDetails && (
        <PetModal
          pet={selectedPetForDetails}
          isFavorite={favorites.includes(selectedPetForDetails.id)}
          onToggleFavorite={handleToggleFavorite}
          onClose={() => setSelectedPetForDetails(null)}
          onAdopt={(pet) => {
            setSelectedPetForDetails(null);
            setSelectedPetForAdoption(pet);
          }}
        />
      )}

      {/* Formulário de Adoção em Modal */}
      {selectedPetForAdoption && (
        <AdoptionFormModal
          pet={selectedPetForAdoption}
          onClose={() => setSelectedPetForAdoption(null)}
          onSubmitSuccess={(petName) => {
            addToast(`Proposta de adoção de ${petName} enviada com sucesso!`, 'success');
          }}
        />
      )}

      {/* Modal de Cadastro de Novo Pet / Download de Planilha */}
      {isRegisterOpen && (
        <PetRegisterModal
          onClose={() => setIsRegisterOpen(false)}
          onAddPet={handleAddPet}
          onNotify={addToast}
        />
      )}

      {/* Toasts de Feedback Interativo */}
      <Toast toasts={toasts} onDismiss={removeToast} />
    </>
  );
}
