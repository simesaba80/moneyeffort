'use client'
import React, { useState } from 'react'

export default function Page() {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [message, setMessage] = useState('')
    const [submitted, setSubmitted] = useState(false)

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        // ここでAPIに送るなどの処理を行ってください
        console.log({ name, email, message })
        setSubmitted(true)
        setName('')
        setEmail('')
        setMessage('')
        setTimeout(() => setSubmitted(false), 3000)
    }

    return (
        <main style={{ maxWidth: 640, margin: '2rem auto', padding: '1rem' }}>
            <h1>簡単なフォーム</h1>
            <form onSubmit={handleSubmit}>
                <label style={{ display: 'block', marginBottom: 12 }}>
                    名前
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        style={{ display: 'block', width: '100%', padding: 8, marginTop: 6 }}
                    />
                </label>

                <label style={{ display: 'block', marginBottom: 12 }}>
                    メール
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        style={{ display: 'block', width: '100%', padding: 8, marginTop: 6 }}
                    />
                </label>

                <label style={{ display: 'block', marginBottom: 12 }}>
                    メッセージ
                    <textarea
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        rows={4}
                        style={{ display: 'block', width: '100%', padding: 8, marginTop: 6 }}
                    />
                </label>

                <button type="submit" style={{ padding: '8px 16px' }}>
                    送信
                </button>
            </form>

            {submitted && <p style={{ color: 'green', marginTop: 12 }}>送信しました。</p>}
        </main>
    )
}