'use client'

import { useState } from 'react'

export default function AIAssistant() {
  const [prompt, setPrompt] = useState('')
  const [response, setResponse] = useState<string>('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async () => {
    if (!prompt.trim()) return

    setLoading(true)
    try {
      const res = await fetch('/api/ai/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt }),
      })
      const data = await res.json()
      
      if (data.text) {
        setResponse(data.text)
      } else {
        setResponse('No response generated. Please try again.')
      }
    } catch (error) {
      setResponse('Error: ' + (error.message || 'Unknown error'))
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="p-8 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold text-green-600 mb-6">AI Assistant</h2>
      <p className="text-gray-600 mb-4">Powered by Supabase AI Gateway (ZDR-compliant)</p>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Your request:</label>
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            className="w-full p-3 rounded border focus:ring-2 focus:ring-green-500 focus-border-transparent"
            rows={4}
            placeholder="Describe what you need help with..."
          ></textarea>
        </div>

        <button
          onClick={handleSubmit}
          className="w-full py-3 bg-green-600 text-white font-medium rounded-xl hover:bg-green-700 transition-colors"
          disabled={loading}
        >
          {loading ? 'Generating...' : 'Generate Response'}
        </button>
      </div>

      {loading && <p className="text-center text-gray-500">Processing...</p>}

      {response && (
        <div className="mt-8 p-4 bg-gray-50 rounded-lg">
          <p className="font-medium text-green-600 mb-2">AI Response:</p>
          <p className="break-words">{response}</p>
        </div>
      )}
    </div>
  )
}