import { useState } from 'react'
import { motion } from 'framer-motion'
import { ThumbsUp, MessageSquare } from 'lucide-react'

export default function Home() {
  const [posts, setPosts] = useState([
    { id: 1, autor: 'Maria (8º ano)', tema: 'Sustentabilidade', texto: 'Precisamos cuidar do planeta com pequenas ações no dia a dia.', comentarios: ['Excelente reflexão! 🌱 - Prof. Ana'], likes: 4 },
    { id: 2, autor: 'João (7º ano)', tema: 'Matemática no cotidiano', texto: 'Uso porcentagem quando vou ao mercado comparar preços.', comentarios: ['Muito bem observado! 👏 - Prof. Carlos'], likes: 6 },
  ])

  const [novoPost, setNovoPost] = useState({ autor: '', tema: '', texto: '' })

  const adicionarPost = () => {
    if (!novoPost.autor || !novoPost.tema || !novoPost.texto) return
    setPosts([...posts, { ...novoPost, id: Date.now(), comentarios: [], likes: 0 }])
    setNovoPost({ autor: '', tema: '', texto: '' })
  }

  const curtirPost = (id) => {
    setPosts(posts.map(post => post.id === id ? { ...post, likes: post.likes + 1 } : post))
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-100 p-8">
      <motion.h1
        className="text-3xl font-bold text-center mb-8 text-blue-700"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        💬 Espaço de Ideias – Estudantes que Ensinam
      </motion.h1>

      <div className="max-w-2xl mx-auto mb-10 shadow-lg bg-white rounded-xl p-6">
        <h2 className="font-semibold text-lg mb-4">Compartilhe seu pensamento</h2>
        <input
          placeholder="Seu nome e série (ex: Ana - 6º ano)"
          value={novoPost.autor}
          onChange={(e) => setNovoPost({ ...novoPost, autor: e.target.value })}
          className="border p-2 w-full rounded-md mb-2"
        />
        <input
          placeholder="Tema (ex: Bullying, Sustentabilidade...)"
          value={novoPost.tema}
          onChange={(e) => setNovoPost({ ...novoPost, tema: e.target.value })}
          className="border p-2 w-full rounded-md mb-2"
        />
        <textarea
          placeholder="Escreva sua explicação, opinião ou resolução..."
          value={novoPost.texto}
          onChange={(e) => setNovoPost({ ...novoPost, texto: e.target.value })}
          className="border p-2 w-full rounded-md mb-3 h-24"
        />
        <button onClick={adicionarPost} className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md">Publicar</button>
      </div>

      <div className="space-y-6 max-w-2xl mx-auto">
        {posts.map((post) => (
          <motion.div key={post.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <div className="bg-white p-5 rounded-xl shadow-md">
              <h3 className="font-semibold text-blue-700">{post.tema}</h3>
              <p className="text-sm text-gray-500 mb-2">por {post.autor}</p>
              <p className="mb-3 text-gray-700">{post.texto}</p>
              <div className="flex items-center gap-3">
                <button onClick={() => curtirPost(post.id)} className="text-blue-600 flex items-center gap-1 text-sm"><ThumbsUp className="w-4 h-4" /> {post.likes}</button>
              </div>
              {post.comentarios.length > 0 && (
                <div className="mt-3 p-2 bg-blue-50 rounded-md">
                  <h4 className="font-medium text-blue-800 flex items-center gap-1"><MessageSquare className="w-4 h-4" /> Comentários do professor:</h4>
                  {post.comentarios.map((c, i) => (
                    <p key={i} className="text-sm text-gray-700 ml-4">• {c}</p>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
