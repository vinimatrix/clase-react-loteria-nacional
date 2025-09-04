
"use client";


import Image from "next/image";
import styles from "./page.module.css";
import { useState,useEffect } from "react";
import { ProductWebList } from "./productos-web/page";
//import *  as libreria from 'page';

// Componente simple
 let contador = 0;
export function Saludo({ nombre, edad }) {
    return (
        <div>
            <h2>¡Hola {nombre}!</h2>
            <p>Tienes {edad} años</p>
        </div>
    );
}

export function Contador() {
  
    const [count, setCount] = useState(0);

    const incrementar = () => {
        setCount(count + 1);
    };

    const decrementar = () => {
      if(count >0){
        setCount(count - 1);
      }
    };

    return (
        <div>
            <h2>Contador: {count}</h2>
            <button onClick={incrementar}>+1</button>
            <button onClick={decrementar}>-1</button>
        </div>
    );
}
function FormularioNombre() {
    const [nombre, setNombre] = useState('');
    const [email, setEmail] = useState('');

    const manejarSubmit = (e) => {
        e.preventDefault();
        console.log('Enviando:', { nombre, email });
       
    };

    return (
        <form  onSubmit={manejarSubmit}>
            <input
                type="text"
                placeholder="Tu nombre"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
            />
            <input
                type="email"
                placeholder="Tu email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <button type="submit">Enviar</button>
        </form>
    );
}
function ListaUsuarios() {
    const usuarios = [
        { id: 1, nombre: 'Ana', email: 'ana@email.com' },
        { id: 2, nombre: 'Carlos', email: 'carlos@email.com' },
        { id: 3, nombre: 'María', email: 'maria@email.com' }
    ];

    return (
        <div>
            <h2>Usuarios Registrados</h2>
            {usuarios.map(usuario => (
                <div key={usuario.id} className="usuario-card">
                    <h3>{usuario.nombre}</h3>
                    <p>{usuario.email}</p>
                </div>
            ))}
        </div>
    );
}
function SaludoCondicional({ usuario, isLoggedIn }) {
    return (
        <div>
            {/* Operador ternario */}
            {isLoggedIn ? (
                <h2>¡Bienvenido de vuelta, {usuario.nombre}!</h2>
            ) : (
                <h2>Por favor, inicia sesión</h2>
            )}
            
            {/* Operador AND */}
            {usuario.esAdmin && <button className="btn">Panel de Admin</button>}
            
            {/* Variable condicional */}
            {(() => {
                if (usuario.puntos > 100) return <span>🏆 VIP</span>;
                if (usuario.puntos > 50) return <span>⭐ Premium</span>;
                return <span>👤 Básico</span>;
            })()}
        </div>
    );
}
function EjemploUseEffect() {
    const [count, setCount] = useState(0);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    // Efecto que se ejecuta después de cada render
    useEffect(() => {
        document.title = `Contador: ${count}`;
    });

    // Efecto con dependencias - solo cuando count cambia
    useEffect(() => {
        console.log('Count cambió a:', count);
    }, [count]);

    // Efecto solo al montar (equivale a componentDidMount)
    useEffect(() => {
        const handleResize = () => setWindowWidth(window.innerWidth);
        window.addEventListener('resize', handleResize);
        
        // Cleanup function
        return () => window.removeEventListener('resize', handleResize);
    }, []); // Array vacío = solo al montar

    return (
        <div>
            <p>Contador: {count}</p>
            <p>Ancho de ventana: {windowWidth}px</p>
            <button onClick={() => setCount(count + 1)}>
                Incrementar
            </button>
        </div>
    );
}

function ContadorPersistente() {
    // Inicializar desde localStorage o valor por defecto
    const [count, setCount] = useState(() => {
        const saved = localStorage.getItem('contador');
        return saved ? parseInt(saved, 10) : 0;
    });

    // Guardar en localStorage cada vez que count cambie
    useEffect(() => {
        localStorage.setItem('contador', count.toString());
    }, [count]);

    const incrementar = () => setCount(count + 1);
    const resetear = () => {
        setCount(0);
        localStorage.removeItem('contador');
    };

    return (
        <div>
            <h2>Contador Persistente: {count}</h2>
            <button onClick={incrementar}>+1</button>
            <button onClick={resetear}>Resetear</button>
            <p>Este contador se mantiene al recargar la página</p>
        </div>
    );
}

// Custom hook para localStorage
function useLocalStorage(key, initialValue) {
    const [value, setValue] = useState(() => {
        try {
            const item = window.localStorage.getItem(key);
            return item ? JSON.parse(item) : initialValue;
        } catch (error) {
            return initialValue;
        }
    });

    const setStoredValue = (value) => {
        try {
            setValue(value);
            window.localStorage.setItem(key, JSON.stringify(value));
        } catch (error) {
            console.log(error);
        }
    };

    return [value, setStoredValue];
}

//aplicacion dde lista de tareas
function TodoApp() {
    const [todos, setTodos] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [filter, setFilter] = useState('all'); //todos, pendiente, completado

    // Cargar todos desde localStorage al montar
    useEffect(() => {
        const savedTodos = localStorage.getItem('todos');
        if (savedTodos) {
            setTodos(JSON.parse(savedTodos));
        }
    }, []);

    // Guardar todos en localStorage cuando cambien
    useEffect(() => {
        localStorage.setItem('todos', JSON.stringify(todos));
    }, [todos]);

    const agregarTodo = (e) => {
        e.preventDefault();
        if (inputValue.trim() !== '') {
            const nuevoTodo = {
                id: Date.now(),
                text: inputValue,
                completed: false
            };
            setTodos([...todos, nuevoTodo]);
            setInputValue('');
        }
    };

    const toggleComplete = (id) => {
        setTodos(todos.map(todo => 
            todo.id === id ? { ...todo, completed: !todo.completed } : todo
        ));
    };

    const eliminarTodo = (id) => {
        setTodos(todos.filter(todo => todo.id !== id));
    };
//filtrar todo
 const filteredTodos = todos.filter(todo => {
        if (filter === 'pending') return !todo.completed;
        if (filter === 'completed') return todo.completed;
        return true; // 'all'
    });
   
 const pendingCount = todos.filter(todo => !todo.completed).length;
    return (
        <div className="todo-app">
            <h1>Mi Lista de Tareas</h1>
             <p>{pendingCount} tareas pendientes</p>
            <form onSubmit={agregarTodo}>
                <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="Agregar nueva tarea..."
                />
                <button type="submit">Agregar</button>
            </form>
            <div className="filters">
                {['all', 'pending', 'completed'].map(filterType => (
                    <button
                        key={filterType}
                        className={filter === filterType ? 'active' : ''}
                        onClick={() => setFilter(filterType)}
                    >
                        {filterType === 'all' ? 'Todas' : 
                         filterType === 'pending' ? 'Pendientes' : 'Completadas'}
                    </button>
                ))}
            </div>

            <div className="todos-container">
                {filteredTodos.map(todo => (
                    <div 
                        key={todo.id} 
                        className={`todo-item ${todo.completed ? 'completed' : ''}`}
                    >
                        <input
                            type="checkbox"
                            checked={todo.completed}
                            onChange={() => toggleComplete(todo.id)}
                        />
                        <span className="todo-text">{todo.text}</span>
                        <button 
                            onClick={() => eliminarTodo(todo.id)}
                            className="delete-btn"
                        >
                            🗑️
                        </button>
                    </div>
                ))}
            </div>
            
            {todos.length === 0 && (
                <div className="empty-state">
                    <p>🎉 ¡No tienes tareas pendientes!</p>
                </div>
            )}
        </div>
    );

//usar fetch


}
const PostsList = () => {
    const [posts, setPosts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/posts?_limit=5')
            .then(res => res.json())
            .then(data => {
                setPosts(data);
                setIsLoading(false);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
                setIsLoading(false);
            });
    }, []); //si useEffect es array vacio solo se ejecuta al inicio (mount) si tiene un estado 

    if (isLoading) return <p>Cargando posts...</p>;
    console.log(posts);
    return (
        <ol>
                {posts.map(post => 
                <li key={post.id}>
                    <div className={'ml-4 flex flex-1 flex-col'}>
                        <div className={'flex justify-between text-base font-medium text-gray-900'}>
                    <h3>{post.title}</h3> 
                      </div>
                    <p>{post.body}</p>
                    </div>
                  
                    </li>)}
        </ol>
    );
};



export default function Home() {
  

  return (
         <div>
           
           <ProductList />
        </div>
  );
}
