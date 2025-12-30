// ============================================
// CLIENT/SRC/COMPONENTS/PETITIONS.JSX (Updated)
// ============================================
import React, { useState, useEffect } from 'react';
import { 
  collection, 
  query, 
  orderBy, 
  onSnapshot,
  addDoc,
  doc,
  updateDoc,
  increment,
  arrayUnion
} from 'firebase/firestore';
import { db } from '../services/firebase';
import { useAuth } from '../context/AuthContext';

const Petitions = ({ onOpenAuth }) => {
  const [petitions, setPetitions] = useState([]);
  const [showSignModal, setShowSignModal] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedPetition, setSelectedPetition] = useState(null);
  const { user } = useAuth();

  useEffect(() => {
    const q = query(collection(db, 'petitions'), orderBy('createdAt', 'desc'));
    
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const petitionsData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setPetitions(petitionsData);
    });

    return () => unsubscribe();
  }, []);

  const handleSignClick = (petition) => {
    if (!user) {
      alert('🔒 Please Log In or Sign Up to sign petitions.');
      onOpenAuth('login');
      return;
    }

    if (petition.signedBy?.includes(user.id)) {
      alert('⚠️ You have already signed this petition!');
      return;
    }

    setSelectedPetition(petition);
    setShowSignModal(true);
  };

  const confirmSign = async () => {
    try {
      const petitionRef = doc(db, 'petitions', selectedPetition.id);
      
      await updateDoc(petitionRef, {
        signatures: increment(1),
        signedBy: arrayUnion(user.id)
      });
      
      alert('✅ Successfully signed!');
      setShowSignModal(false);
    } catch (error) {
      alert('Error signing petition: ' + error.message);
    }
  };

  const handleCreateClick = () => {
    if (!user) {
      alert('🔒 You must be logged in to start a petition.');
      onOpenAuth('login');
      return;
    }
    setShowCreateModal(true);
  };

  const handleCreateSubmit = async (e) => {
    e.preventDefault();
    const title = e.target.title.value;
    const description = e.target.description.value;

    try {
      await addDoc(collection(db, 'petitions'), {
        title,
        description,
        signatures: 1,
        goal: 1000,
        signedBy: [user.id],
        createdBy: user.id,
        createdByName: user.name,
        image: 'https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?auto=format&fit=crop&w=500&q=60',
        createdAt: new Date().toISOString()
      });
      
      alert('🚀 Petition Created Successfully!');
      setShowCreateModal(false);
      e.target.reset();
    } catch (error) {
      alert('Error creating petition: ' + error.message);
    }
  };

  return (
    <section id="petition-section" className="section">
      <div className="section-header">
        <h2>📢 Active Petitions</h2>
        <button onClick={handleCreateClick} className="create-btn">+ Start Petition</button>
      </div>
      <div className="petition-grid">
        {petitions.map(p => {
          const percent = Math.min((p.signatures / p.goal) * 100, 100);
          return (
            <div key={p.id} className="petition-card">
              <img src={p.image} alt="Petition" className="petition-img" />
              <div className="petition-content">
                <h3>{p.title}</h3>
                <p className="petition-desc">{p.description}</p>
                <div className="progress-container">
                  <div className="progress-bar" style={{ width: `${percent}%` }} />
                </div>
                <p className="petition-stats">
                  <strong>{p.signatures.toLocaleString()}</strong> signatures of {p.goal.toLocaleString()} goal
                </p>
                <button onClick={() => handleSignClick(p)} className="sign-btn">✏️ Sign Petition</button>
              </div>
            </div>
          );
        })}
      </div>

      {showSignModal && (
        <div className="modal">
          <div className="modal-content">
            <span onClick={() => setShowSignModal(false)} className="close-modal">&times;</span>
            <h3>Confirm Signature</h3>
            <p>You are about to sign: <strong>{selectedPetition.title}</strong></p>
            <button onClick={confirmSign} className="primary-btn">Yes, Sign It</button>
          </div>
        </div>
      )}

      {showCreateModal && (
        <div className="modal">
          <div className="modal-content">
            <span onClick={() => setShowCreateModal(false)} className="close-modal">&times;</span>
            <h3>Start a New Petition</h3>
            <form onSubmit={handleCreateSubmit}>
              <label>Petition Title</label>
              <input name="title" type="text" required />
              <label>Description</label>
              <textarea name="description" rows="4" required />
              <button type="submit" className="primary-btn">🚀 Launch Petition</button>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};

export default Petitions;
