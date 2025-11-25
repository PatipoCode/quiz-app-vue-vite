import { createI18n } from 'vue-i18n'

const messages = {
    en: {
        question: {
            language: 'What is your preferred language?',
            gender: 'What gender do you identify with?',
            age: 'What is your age?',
            book_dislike: 'What do you {hl} the most in a book?',
            favorite_topics: 'What are your favorite topics?',
            loading: 'Loading questions..',
        },
        word: {
            highlight: 'hate',
        },
        subtitle: {
            language: 'Choose language',
            gender: 'Please share how do you identify yourself',
            favorite_topics: 'Choose up to 3 topics you like',
        },
        answers: {
            english: 'English',
            french: 'French',
            german: 'German',
            spanish: 'Spanish',
        },
        gender: {
            female: 'Female',
            male: 'Male',
            other: 'Other',
        },
        age: {
            '18_29': '18–29 years',
            '30_39': '30–39 years',
            '40_49': '40–49 years',
            '50_plus': '50+',
        },
        book_dislike: {
            logic: 'Poor logic',
            speed: 'Too slow',
            humor: 'No humor',
            ending: 'Bad ending',
        },
        topic: {
            werewolf: 'Werewolf',
            action: 'Action',
            royal_obsession: 'Royal obsession',
            billionaire: 'Billionaire',
            romance: 'Romance',
            young_adult: 'Young adult',
            bad_boy: 'Bad boy',
        },
        loader: {
            hint: 'Finding collections for you…',
        },
        email: {
            form_label: 'Email submission form',
            label: 'Email',
            title: 'Email',
            subtitle: 'Enter your email to get full access',
            placeholder: 'Your email',
            error: {
                invalid: 'Please provide a valid email address',
                required: 'Email is required',
                tooLong: 'Email address is too long',
            },
            legal: {
                prefix: 'By continuing I agree with',
                privacy: 'Privacy policy',
                and: 'and',
                terms: 'Terms of use',
            },
        },
        button: {
            next: 'Next',
            retake: 'Retake quiz',
        },
        final: {
            title: 'Thank you',
            subtitle: 'for supporting us and passing quiz',
            download: 'Download my answers',
            retake: 'Retake quiz',
            download_label: "Download answers as CSV file",
        },
        progress_bar: {
            "question": "Question {current} of {total}",
            "completed": "{percent}% completed"
        }
    },

    fr: {
        question: {
            language: 'Quelle est votre langue préférée ?',
            gender: 'Quel genre vous identifiez-vous ?',
            age: 'Quel âge avez-vous ?',
            book_dislike: 'Qu’est-ce que vous {hl} le plus dans un livre ?',
            favorite_topics: 'Quels sont vos sujets préférés ?',
            loading: 'Chargement des questions...',
        },
        word: {
            highlight: 'détestez',
        },
        subtitle: {
            language: 'Choisissez la langue',
            gender: 'Veuillez préciser comment vous vous identifiez',
            favorite_topics: 'Choisissez jusqu’à 3 thèmes que vous aimez',
        },
        answers: {
            english: 'Anglais',
            french: 'Français',
            german: 'Allemand',
            spanish: 'Espagnol',
        },
        gender: {
            female: 'Femme',
            male: 'Homme',
            other: 'Autre',
        },
        age: {
            '18_29': '18–29 ans',
            '30_39': '30–39 ans',
            '40_49': '40–49 ans',
            '50_plus': '50+',
        },
        book_dislike: {
            logic: 'Logique faible',
            speed: 'Trop lent',
            humor: 'Pas d’humour',
            ending: 'Mauvaise fin',
        },
        topic: {
            werewolf: 'Loup-garou',
            action: 'Action',
            royal_obsession: 'Obsession royale',
            billionaire: 'Milliardaire',
            romance: 'Romance',
            young_adult: 'Jeune adulte',
            bad_boy: 'Mauvais garçon',
        },
        loader: {
            hint: 'Recherche de collections pour vous…',
        },
        email: {
            form_label: 'Formulaire de saisie d`email',
            label: 'Email',
            title: 'E-mail',
            subtitle: 'Saisissez votre e-mail pour obtenir l’accès complet',
            placeholder: 'Votre e-mail',
            error: {
                invalid: 'Veuillez fournir une adresse e-mail valide',
                required: 'L\'e-mail est requis',
                tooLong: 'L\'adresse e-mail est trop longue',
            },
            legal: {
                prefix: 'En continuant, j’accepte la',
                privacy: 'Politique de confidentialité',
                and: 'et les',
                terms: 'Conditions d’utilisation',
            },
        },
        button: {
            next: 'Suivant',
            retake: 'Reprendre le quiz',
        },
        final: {
            title: 'Merci',
            subtitle: 'pour votre soutien et d’avoir passé le quiz',
            download: 'Télécharger mes réponses',
            retake: 'Reprendre le quiz',
            download_label: "Télécharger les réponses au format CSV",
        },
        progress_bar: {
            "question": "Question {current} sur {total}",
            "completed": "{percent}% terminé"
        }
    },

    de: {
        question: {
            language: 'Welche Sprache bevorzugst du?',
            gender: 'Mit welchem Geschlecht identifizierst du dich?',
            age: 'Wie alt bist du?',
            book_dislike: 'Was {hl} du an einem Buch am meisten?',
            favorite_topics: 'Was sind deine Lieblingsthemen?',
            loading: 'Fragen werden geladen...',
        },
        word: {
            highlight: 'hasst',
        },
        subtitle: {
            language: 'Sprache wählen',
            gender: 'Bitte gib an, wie du dich identifizierst',
            favorite_topics: 'Wähle bis zu 3 Themen, die dir gefallen',
        },
        answers: {
            english: 'Englisch',
            french: 'Französisch',
            german: 'Deutsch',
            spanish: 'Spanisch',
        },
        gender: {
            female: 'Weiblich',
            male: 'Männlich',
            other: 'Anderes',
        },
        age: {
            '18_29': '18–29 Jahre',
            '30_39': '30–39 Jahre',
            '40_49': '40–49 Jahre',
            '50_plus': '50+',
        },
        book_dislike: {
            logic: 'Schlechte Logik',
            speed: 'Zu langsam',
            humor: 'Kein Humor',
            ending: 'Schlechtes Ende',
        },
        topic: {
            werewolf: 'Werwolf',
            action: 'Action',
            royal_obsession: 'Royale Besessenheit',
            billionaire: 'Milliardär',
            romance: 'Romanze',
            young_adult: 'Young Adult',
            bad_boy: 'Böser Junge',
        },
        loader: {
            hint: 'Wir suchen Sammlungen für dich…',
        },
        email: {
            form_label: 'E-Mail-Eingabeformular',
            label: 'Email',
            title: 'E-Mail',
            subtitle: 'Gib deine E-Mail ein, um vollen Zugriff zu erhalten',
            placeholder: 'Deine E-Mail',
            error: {
                invalid: 'Bitte geben Sie eine gültige E-Mail-Adresse ein',
                required: 'E-Mail ist erforderlich',
                tooLong: 'E-Mail-Adresse ist zu lang',
            },
            legal: {
                prefix: 'Mit dem Fortfahren stimme ich der',
                privacy: 'Datenschutzerklärung',
                and: 'und den',
                terms: 'Nutzungsbedingungen',
            },
        },
        button: {
            next: 'Weiter',
            retake: 'Quiz neu starten',
        },
        final: {
            title: 'Danke',
            subtitle: 'für deine Unterstützung und das Absolvieren des Quiz',
            download: 'Meine Antworten herunterladen',
            retake: 'Quiz neu starten',
            download_label: 'Antworten als CSV-Datei herunterladen',
        },
        progress_bar: {
            "question": "Frage {current} von {total}",
            "completed": "{percent}% abgeschlossen"
        }
    },

    es: {
        question: {
            language: '¿Cuál es tu idioma preferido?',
            gender: '¿Con qué género te identificas?',
            age: '¿Cuál es tu edad?',
            book_dislike: '¿Qué {hl} más en un libro?',
            favorite_topics: '¿Cuáles son tus temas favoritos?',
            loading: 'Cargando preguntas...',
        },
        word: {
            highlight: 'odias',
        },
        subtitle: {
            language: 'Elige el idioma',
            gender: 'Indica cómo te identificas',
            favorite_topics: 'Elige hasta 3 temas que te gusten',
        },
        answers: {
            english: 'Inglés',
            french: 'Francés',
            german: 'Alemán',
            spanish: 'Español',
        },
        gender: {
            female: 'Femenino',
            male: 'Masculino',
            other: 'Otro',
        },
        age: {
            '18_29': '18–29 años',
            '30_39': '30–39 años',
            '40_49': '40–49 años',
            '50_plus': '50+',
        },
        book_dislike: {
            logic: 'Poca lógica',
            speed: 'Demasiado lento',
            humor: 'Sin humor',
            ending: 'Mal final',
        },
        topic: {
            werewolf: 'Hombre lobo',
            action: 'Acción',
            royal_obsession: 'Obsesión real',
            billionaire: 'Multimillonario',
            romance: 'Romance',
            young_adult: 'Joven adulto',
            bad_boy: 'Chico malo',
        },
        loader: {
            hint: 'Buscando colecciones para ti…',
        },
        email: {
            form_label: 'Formulario de envío de correo electrónico',
            label: 'Email',
            title: 'Correo electrónico',
            subtitle: 'Introduce tu correo para obtener acceso completo',
            placeholder: 'Tu correo',
            error: {
                invalid: 'Por favor, proporciona una dirección de correo válida',
                required: 'El correo electrónico es obligatorio',
                tooLong: 'La dirección de correo es demasiado larga',
            },
            legal: {
                prefix: 'Al continuar acepto la',
                privacy: 'Política de privacidad',
                and: 'y los',
                terms: 'Términos de uso',
            },
        },
        button: {
            next: 'Siguiente',
            retake: 'Repetir el quiz',
        },
        final: {
            title: 'Gracias',
            subtitle: 'por apoyarnos y completar el quiz',
            download: 'Descargar mis respuestas',
            retake: 'Repetir el quiz',
            download_label: 'Descargar respuestas como archivo CSV',
        },
        progress_bar: {
            "question": "Pregunta {current} de {total}",
            "completed": "{percent}% completado"
        }
    },
}

export default createI18n({
    legacy: false,
    locale: 'en',
    fallbackLocale: 'en',
    messages,
    globalInjection: true,
})
