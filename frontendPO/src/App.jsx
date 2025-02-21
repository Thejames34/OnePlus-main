import { useState, useEffect } from 'react';
import oneplusImg from './assets/img/oneplus.png';
import './App.css';

function App() {
  const [isVisible, setIsVisible] = useState(true);
  const [showLogin, setShowLogin] = useState(false);
  const [usuario, setUsuario] = useState('');
  const [contraseña, setContraseña] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      document.documentElement.classList.add('bg-transition');
      setTimeout(() => {
        setShowLogin(true);
      }, 2500);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true); // Mostrar carga

    try {
      const response = await fetch('http://localhost:5000/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ usuario, contraseña }),
      });

      const data = await response.json();
      if (data.success) {
        setMensaje('✅ Inicio de sesión exitoso');
        setTimeout(() => {
          window.location.href = 'https://example.com'; // Redirige después de 1s
        }, 1000);
      } else {
        setMensaje('❌ Usuario o contraseña incorrectos');
      }
    } catch (error) {
      setMensaje('❌ Error en la conexión con el servidor');
    } finally {
      setLoading(false); // Ocultar carga
    }
  };

  return (
    <div className="app-container">
      {isVisible && (
        <img
          src={oneplusImg}
          alt="OnePlus"
          className={`oneplus-image ${isVisible ? 'visible' : 'fade-out'}`}
        />
      )}

      {showLogin && (
        <div className="login-container">
          <h2>Iniciar Sesión</h2>
          <form onSubmit={handleLogin} className="login-form">
            <input
              type="text"
              placeholder="Usuario"
              value={usuario}
              onChange={(e) => setUsuario(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Contraseña"
              value={contraseña}
              onChange={(e) => setContraseña(e.target.value)}
              required
            />
            <button type="submit" disabled={loading}>
              {loading ? 'Ingresando...' : 'Ingresar'}
            </button>
          </form>
          {mensaje && <p className="login-message">{mensaje}</p>}
        </div>
      )}
    </div>
  );
}

export default App;
