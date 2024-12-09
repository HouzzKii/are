document.addEventListener('DOMContentLoaded', () => {
    const chatMessages = document.getElementById('chat-messages');
    const userInput = document.getElementById('user-input');
    const sendBtn = document.getElementById('send-btn');

    // Expanded response categories dengan dukungan emosional yang lebih mendalam
    const mentalHealthResponses = {
        'sedih': [
            'Aku mengerti perasaanmu saat ini. Sedih itu hal yang wajar, dan kamu tidak sendiri.',
            'Peluk virtual untukmu. Mau ceritakan apa yang membuatmu sedih hari ini?',
            'Setiap air mata memiliki cerita. Aku siap mendengarkan tanpa menghakimi.'
        ],
        'stress': [
            'Nafas dalam-dalam ya. Kamu kuat menghadapi tantangan ini.',
            'Stress bisa membuatmu merasa lelah. Mari kita cari cara untuk meredakannya bersama.',
            'Ingatkan dirimu bahwa kekuatanmu lebih besar dari stressmu saat ini.'
        ],
        'depresi': [
            'Kamu lebih kuat dari yang kamu pikirkan. Depresi bukan kelemahanmu.',
            'Aku di sini untukmu. Tidak perlu merasa sendiri dalam perjalanan ini.',
            'Setiap langkah kecil yang kamu ambil adalah kemenangan besar.'
        ],
        'anxiety': [
            'Cemas itu normal. Mari kita hadapi bersama dengan napas dan ketenangan.',
            'Kecemasan tidak mendefinisikan dirimu. Kamu lebih dari sekadar perasaan ini.',
            'Saat ini, fokus pada hal-hal yang bisa kamu kendalikan.'
        ],
        'sendiri': [
            'Kamu tidak sendiri, meskipun terasa begitu. Aku ada di sini untuk mendengarkan.',
            'Rasa kesepian itu nyata, tapi ingat bahwa kamu berharga dan dicintai.',
            'Hubungan bermakna bisa dibangun perlahan. Kamu istimewa.'
        ]
    };

    // Kumpulan pesan semangat dan motivasi
    const encouragementMessages = [
        'Kamu kuat! Percaya pada dirimu sendiri.',
        'Setiap hari adalah kesempatan untuk memulai ulang.',
        'Kamu layak bahagia dan damai.',
        'Meskipun sulit, kamu akan melewati ini.',
        'Keberanian tidak berarti tidak pernah merasa takut, tapi melangkah meskipun takut.',
        'Setiap tantangan adalah kesempatan untuk tumbuh.',
        'Kamu tidak perlu sempurna untuk menjadi luar biasa.',
        'Beri dirimu waktu dan ruang untuk pulih.',
        'Perasaanmu valid dan penting.'
    ];

    // Teknik relaksasi sederhana
    const relaxationTechniques = [
        'Coba tarik napas dalam-dalam 4 detik, tahan 4 detik, lalu keluarkan perlahan 4 detik.',
        'Fokuskan perhatianmu pada 5 hal yang bisa kamu lihat, 4 hal yang bisa kau sentuh, 3 hal yang bisa kau dengar.',
        'Bayangkan tempat teraman dan ternyamanmu. Rasakan ketenangan di sana.',
        'Hitung mundur dari 10 dengan perlahan sambil bernapas dalam.',
        'Lepaskan ketegangan dengan meregangkan otot-otot leher dan bahu.'
    ];

    function addMessage(message, type) {
        const messageElement = document.createElement('div');
        messageElement.classList.add(type);
        messageElement.textContent = message;
        chatMessages.appendChild(messageElement);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    function getBotResponse(userMessage) {
        const lowerMessage = userMessage.toLowerCase();
        
        // Cek respons khusus
        for (const [keyword, responses] of Object.entries(mentalHealthResponses)) {
            if (lowerMessage.includes(keyword)) {
                // Tambahkan teknik relaksasi atau pesan semangat
                const additionalMessage = Math.random() > 0.5 
                    ? relaxationTechniques[Math.floor(Math.random() * relaxationTechniques.length)]
                    : encouragementMessages[Math.floor(Math.random() * encouragementMessages.length)];
                
                return [
                    responses[Math.floor(Math.random() * responses.length)],
                    additionalMessage
                ].join('\n\n');
            }
        }

        // Respons default dengan variasi
        const defaultResponses = [
            'Terima kasih sudah berbagi. Aku mendengarkanmu dengan sepenuh hati.',
            'Ceritamu penting. Aku siap mendengarkan tanpa syarat.',
            'Setiap perasaan valid. Mau berbagi lebih lanjut?',
            encouragementMessages[Math.floor(Math.random() * encouragementMessages.length)]
        ];

        return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
    }

    // Fitur pesan berkala untuk dukungan
    function sendPeriodicEncouragement() {
        if (chatMessages.children.length > 1) {
            const encouragement = encouragementMessages[Math.floor(Math.random() * encouragementMessages.length)];
            addMessage(encouragement, 'bot-message');
        }
    }

    // Kirim pesan dukungan setiap 5-10 menit
    setInterval(sendPeriodicEncouragement, 5 * 60 * 1000);

    sendBtn.addEventListener('click', sendMessage);
    userInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') sendMessage();
    });

    function sendMessage() {
        const message = userInput.value.trim();
        if (message) {
            addMessage(message, 'user-message');
            userInput.value = '';

            // Simulasi respons bot dengan delay realistis
            setTimeout(() => {
                const botResponse = getBotResponse(message);
                addMessage(botResponse, 'bot-message');
            }, 1000 + Math.random() * 1000);
        }
    }

    // Pesan selamat datang dengan tips awal
    setTimeout(() => {
        const welcomeTips = [
            'Selamat datang di Ruang Cerita Era! Kami siap mendengarkan.',
            'Tips: Berbicara tentang perasaan bisa membantumu merasa lebih baik.',
            'Ingat, kamu tidak sendiri dalam perjalanan kesehatan mentalmu.'
        ];
        welcomeTips.forEach(tip => {
            addMessage(tip, 'bot-message');
        });
    }, 2000);
});