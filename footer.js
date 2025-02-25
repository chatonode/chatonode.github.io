// URLs for different word lists
const JSON_URLS = {
  b1telcpt1:
    'https://script.google.com/macros/s/AKfycbx4gHC-bY0VmvCeZo1fnZ2myu9qdEIoJw0xCk0kjb-yFVinPHypN458aZDdlI1CEJM/exec',
  b1telcpt2:
    'https://script.googleusercontent.com/macros/echo?user_content_key=Gs_T1_BtJgo68Rq7DUrGxs1uKJH3uaXkCkAAG-VJlJTyeFLEEndTWIwgDxUFlxPsEnbhNpXqL5p-A_udEgZzOavWNpCykLr8m5_BxDlH2jW0nuo2oDemN9CCS2h10ox_1xSncGQajx_ryfhECjZEnALkkP5rhZLWK4mhfbdLHXykRb2__QFrBFG1jt2RdQ25xS94AGBZe3egWcJgiE_WTDETglXqkmc3b4QFRgnNx1W8cv7vWJ9jUQ&lib=MmEIQx_PXkRyMvxX9OmNoYFLDhaBgl_dE',
  b1telcpt3:
    'https://script.googleusercontent.com/macros/echo?user_content_key=-DqeJ4hRVzZQ6jg7GzNqXqau-YDeYAuUbIJSfCxdlec8ogcIlFMrDJHGJL_gOhTKjoKxohhDhQeRX8RbXMplgDwM6CyHTGmnm5_BxDlH2jW0nuo2oDemN9CCS2h10ox_1xSncGQajx_ryfhECjZEnENgxJCDFrjs6JyZ1GGG4RM390WSYlFJahGv7vxAesNVHcnZqINdAEhBXe369Q_rkTCCIDBzZyM04DQEGU-K7khKoSOdad6tfw&lib=MmEIQx_PXkRyMvxX9OmNoYFLDhaBgl_dE',
  b1telcpt4:
    'https://script.googleusercontent.com/macros/echo?user_content_key=X5GmhOorbYcFAO9AlOBaKeigyKoSTW3fsY_nKBLZH6yNSgHGmqEU7BW-sShIapltxLFruSb5AYWrB4wVzGmkJIPVhIyUWXSYm5_BxDlH2jW0nuo2oDemN9CCS2h10ox_1xSncGQajx_ryfhECjZEnJZ31fvYy2gsmZkeRqZLyZW-rzexs4eP9SbReR_KHkVIG4bpUFOqrAIxJMj1cgsZLrxKiHKDk848jFZLaVWSAKXiKlrA50qxHQ&lib=MmEIQx_PXkRyMvxX9OmNoYFLDhaBgl_dE',
}

const JSON_URLS_VERB = {
  b1telcpt1: 'https://chatonode.github.io/verb.json',
  b1telcpt2: 'https://chatonode.github.io/verb.json',
  b1telcpt3: 'https://chatonode.github.io/verb.json',
  b1telcpt4: 'https://chatonode.github.io/verb.json',
}

// Global variables
let currentType = 'noun'
const types = ['noun', 'verb', 'adjective', 'adverb']

let kelimeListesi = []
let kelimeListesiExercise = []
let currentLearnIndex = 0
let currentExerciseIndex = 0
let totalWordsLearn = 0
let totalWordsExercise = 0
// let learnedWords = 0
let learnedWords = {
  noun: 0,
  verb: 0,
  adjective: 0,
  adverb: 0,
}

let correctAnswerWordsCounter = 0
let initialTotalWords = 0 // Yeni eklenen değişken

let repeatButtons
let iKnowButtons

Webflow.push(function () {
  console.log('Webflow tamamen yüklendi.')
  const nounTab = document.getElementById('nounTab')
  const verbTab = document.getElementById('verbTab')
  const adjectiveTab = document.getElementById('adjectiveTab')
  const adverbTab = document.getElementById('adverbTab')

  nounTab.addEventListener('click', function () {
    console.log('Noun seçildi.')
    updateType(types[0])
    console.log(currentType)
  })

  verbTab.addEventListener('click', function () {
    console.log('Verb seçildi.')
    updateType(types[1])
    console.log(currentType)
  })

  adjectiveTab.addEventListener('click', function () {
    console.log('Adjective seçildi.')
    updateType(types[2])
    console.log(currentType)
  })

  adverbTab.addEventListener('click', function () {
    console.log('Adverb seçildi.')
    updateType(types[3])
    console.log(currentType)
  })
})

function updateType(type) {
  currentType = type
}

// Utility function to shuffle arrays
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[array[i], array[j]] = [array[j], array[i]]
  }
}

// UI visibility functions
function showSkeleton() {
  const skeletonState = document.getElementById('skeletonState')
  const favoritesContainer = document.getElementById('favoritesContainer')

  if (skeletonState) {
    skeletonState.style.display = 'flex'
  }
  if (favoritesContainer) {
    favoritesContainer.style.display = 'none'
  }

  hideLearnElements()
}

function hideSkeleton() {
  const skeletonState = document.getElementById('skeletonState')
  const favoritesContainer = document.getElementById('favoritesContainer')

  if (skeletonState) {
    skeletonState.style.display = 'none'
  }
  if (favoritesContainer) {
    favoritesContainer.style.display = 'block'
  }

  showLearnElements()
}

// Learn elements visibility
function hideLearnElements() {
  const elements = [
    'addToFavoritesLearn',
    'wordLearn',
    'translationLearn',
    'ruleLearn',
    'sentenceHead',
    'exampleLearn',
  ]

  elements.forEach((id) => {
    const element = document.getElementById(id)
    if (element) {
      element.style.display = 'none'
    }
  })
}

function showLearnElements() {
  const elements = [
    'addToFavoritesLearn',
    'wordLearn',
    'translationLearn',
    'ruleLearn',
    'sentenceHead',
    'exampleLearn',
  ]

  elements.forEach((id) => {
    const element = document.getElementById(id)
    if (element) {
      element.style.display = 'block'
    }
  })
}

// Dropdown seçeneklerini dinle
document.querySelectorAll('.dropdown-link').forEach((link) => {
  link.addEventListener('click', async function (event) {
    event.preventDefault()
    const selectedOption = link.getAttribute('data-option')
    const selectedText = link.innerText

    // Seçilen option'ı localStorage'a kaydet
    localStorage.setItem('lastSelectedTopic', selectedOption)

    if (selectedOption) {
      // Dropdown başlığını güncelle
      document.getElementById('dropdownHeader').innerText = selectedText

      let learnedWords = {
        noun: 0,
        verb: 0,
        adjective: 0,
        adverb: 0,
      }
      console.log(learnedWords)

      // // Sayaçları sıfırla
      // Object.entries(learnedWords).forEach(([key, _]) => {
      //   learnedWords[key] = 13
      //   console.log('LEARNED WORDS NEW KEY/VALUE:' + learnedWords[key])
      // })

      correctAnswerWordsCounter = 0
      localStorage.setItem('learnedWords', learnedWords)
      localStorage.setItem(
        'correctAnswerWordsCounter',
        correctAnswerWordsCounter
      )

      // UI'ı güncelle
      document.getElementById('remainingWordsCountLearn').innerText =
        learnedWords
      document.getElementById('remainingWordsCountExercise').innerText =
        correctAnswerWordsCounter

      // Seçilen konu başlığını güncelle
      updateTopicNames(selectedOption)

      // İndeksleri sıfırla
      currentLearnIndex = 0
      currentExerciseIndex = 0

      try {
        await loadWords(selectedOption)
        console.log('JSON başarıyla yüklendi.')
        showLearnWord()
        showExerciseWord()
      } catch (error) {
        console.error('Kelime yükleme hatası:', error)
      }
    }
  })
})

// Kelime yükleme fonksiyonu
async function loadWords(topic) {
  try {
    showSkeleton()

    // Sayaçları sıfırla
    correctAnswerWordsCounter = 0
    learnedWords = 0
    localStorage.setItem('correctAnswerWordsCounter', correctAnswerWordsCounter)
    localStorage.setItem('learnedWords', learnedWords)

    // Feedback mesajını temizle
    const feedbackMessage = document.getElementById('feedbackMessage')
    if (feedbackMessage) {
      feedbackMessage.innerText = ''
    }

    const response = await fetch(
      currentType === 'noun'
        ? JSON_URLS[topic]
        : currentType === 'verb'
        ? JSON_URLS_VERB[topic]
        : // : currentType === 'adjective'
          // ? JSON_URLS_ADJECTIVE[topic]
          // : currentType === 'adverb'
          // ? JSON_URLS_ADVERB[topic]
          null
    )

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data = await response.json()
    kelimeListesi = [...data]
    kelimeListesiExercise = [...data]
    initialTotalWords = data.length
    totalWordsExercise = initialTotalWords
    totalWordsLearn = initialTotalWords

    shuffleArray(kelimeListesi)
    shuffleArray(kelimeListesiExercise)

    switch (currentType) {
      case 'noun':
        // LocalStorage'daki progress listelerini temizle
        localStorage.setItem('inProgressWords', JSON.stringify([]))
        //localStorage.setItem("learnedWithExerciseWords", JSON.stringify([]));

        break
      case 'verb':
        // LocalStorage'daki progress listelerini temizle
        localStorage.setItem('inProgressWordsVerb', JSON.stringify([]))
        //localStorage.setItem("learnedWithExerciseWordsVerb", JSON.stringify([]));
        break
    }

    document.getElementById('totalWordsCountLearn').innerText = totalWordsLearn
    document.getElementById('remainingWordsCountLearn').innerText = learnedWords
    document.getElementById('totalWordsCountExercise').innerText =
      totalWordsExercise
    document.getElementById('remainingWordsCountExercise').innerText =
      correctAnswerWordsCounter

    hideSkeleton()
  } catch (error) {
    console.error('Error fetching JSON:', error)
    hideSkeleton()
    throw error
  }
}

// Konu başlıklarını güncelleme fonksiyonu
function updateTopicNames(selectedOption) {
  const topicNames = {
    b1telcpt1: 'Level: A1 - A2',
    b1telcpt2: 'Level: A2 - B1',
    b1telcpt3: 'Level: B1 - B2',
    b1telcpt4: 'Level: C1 - C2',
  }

  const topicName = topicNames[selectedOption] || 'Level: A1 - A2'
  document.getElementById('selectedTopicName').innerText = topicName
  document.getElementById('selectedTopicNameExercise').innerText = topicName
}

function artikelRenk(artikel) {
  if (artikel.toLowerCase() === 'der') {
    return 'blue'
  }
  if (artikel.toLowerCase() === 'die') {
    return 'red'
  }
  if (artikel.toLowerCase() === 'das') {
    return 'green'
  }
  return 'black'
}

function showLearnWord() {
  if (!kelimeListesi || kelimeListesi.length === 0) {
    document.getElementById('wordLearn').innerText = 'No words to display.'
    document.getElementById('translationLearn').innerText = ''
    document.getElementById('exampleLearn').innerText = ''
    document.getElementById('levelTagLearn').innerText = ''
    document.getElementById('ruleLearn').innerText = '' // Kural boş

    if (iKnowButtons) {
      iKnowButtons.style.visibility = 'hidden'
    }
    if (repeatButtons) {
      repeatButtons.style.visibility = 'hidden'
    }
    return
  }

  const { almanca, artikel, ingilizce, ornek, highlight, seviye, kural } =
    kelimeListesi[currentLearnIndex]

  if (learnedWords.length > 0) {
    kelimeListesi = kelimeListesi.filter(
      (word) =>
        !learnedWords.some((learned) => learned.almanca === word.almanca)
    )
  }
  const renk = artikelRenk(artikel)

  // Highlight kısmını vurgula
  let highlightedWord = almanca
  if (highlight) {
    const regex = new RegExp(`(${highlight})`, 'i')
    highlightedWord = almanca.replace(
      regex,
      `<span class="highlight">$1</span>`
    )
  }

  document.getElementById('levelTagLearn').innerText = seviye || 'N/A'
  document.getElementById(
    'wordLearn'
  ).innerHTML = `<span style="color: ${renk};">${highlightedWord}</span>`
  document.getElementById('translationLearn').innerText = ingilizce || 'N/A'
  document.getElementById('exampleLearn').innerText = ornek || 'N/A'

  const ruleLearnElement = document.getElementById('ruleLearn')

  // Kural setini göster
  if (kural) {
    ruleLearnElement.innerText = `Rule: ${kural}`
    ruleLearnElement.style.display = 'block'

    // Animasyonu tekrar ettir
    ruleLearnElement.classList.remove('highlight-animation')
    void ruleLearnElement.offsetWidth // Bu satır animasyonu yeniden tetikler
    ruleLearnElement.classList.add('highlight-animation')
  } else {
    ruleLearnElement.innerText = ''
    ruleLearnElement.style.display = 'none'
  }

  // Favori ikonlarını güncelle
  updateFavoriteIcons()
}

function showExerciseWord() {
  if (!kelimeListesiExercise.length) {
    // Liste boşsa UI'ı temizle
    document.getElementById('levelTagExercise').innerText = ''
    document.getElementById('exerciseWord').innerText = ''
    document.getElementById('exerciseTranslation').innerText = ''
    return
  }

  // Index kontrolü
  if (currentExerciseIndex >= kelimeListesiExercise.length) {
    currentExerciseIndex = 0
  }

  let inProgressWords =
    JSON.parse(localStorage.getItem('inProgressWords')) || []

  learnedWithExerciseWords =
    JSON.parse(localStorage.getItem('learnedWithExerciseWords')) || []

  // 🟢 `kelimeListesi` içinden `learnedWords`'de olanları çıkar
  if (learnedWithExerciseWords.length > 0) {
    kelimeListesiExercise = kelimeListesiExercise.filter(
      (word) =>
        !learnedWithExerciseWords.some(
          (learned) => learned.almanca === word.almanca
        )
    )
  }

  if (kelimeListesiExercise.length === 0) {
    document.getElementById('levelTagExercise').innerText = ''
    console.log('Kelime listesi boş. Gösterilecek kelime yok.')
    return
  }

  if (correctAnswerWordsCounter === kelimeListesiExercise.length) {
    document.getElementById('remainingWordsCountExercise').innerText =
      correctAnswerWordsCounter
    showModal('You completed all exercise words! 🎉')
    document.getElementById('exampleLearn').innerText =
      'You learned all of the words, go to exercise section.'

    buttonDer.style.visibility = 'hidden'
    buttonDie.style.visibility = 'hidden'
    buttonDas.style.visibility = 'hidden'
    document.getElementById(
      'feedbackMessage'
    ).innerText = `You completed all exercise words! 🎉`
  }

  const currentWord = kelimeListesiExercise[currentExerciseIndex]
  const progressWord = inProgressWords.find(
    (item) => item.almanca === currentWord.almanca
  )

  const { kelime, artikel, ingilizce, seviye } =
    kelimeListesiExercise[currentExerciseIndex]
  const renk = artikelRenk(artikel)

  // Kelimenin Almanca kısmını göster
  document.getElementById('exerciseWord').innerText = kelime
  document.getElementById('levelTagExercise').innerText = seviye || 'N/A'

  // İngilizce çeviriyi göster (ID üzerinden erişim)
  const exerciseTranslationElement = document.getElementById(
    'exerciseTranslation'
  )
  if (exerciseTranslationElement) {
    exerciseTranslationElement.innerText = ingilizce // İngilizce çeviriyi göster
  } else {
    console.error('exerciseTranslation ID not found!')
  }

  if (progressWord) {
    const counter = progressWord.counter
    document.getElementById('progressLeft').style.opacity =
      counter >= 1 ? '1' : '0.5'
    document.getElementById('progressMiddle').style.opacity =
      counter >= 2 ? '1' : '0.5'
    document.getElementById('progressRight').style.opacity =
      counter >= 3 ? '1' : '0.5'
  } else {
    // Default state
    document.getElementById('progressLeft').style.opacity = '0.5'
    document.getElementById('progressMiddle').style.opacity = '0.5'
    document.getElementById('progressRight').style.opacity = '0.5'
  }

  // Default olarak boş bırakılan artikel alanı
  document.getElementById('correctAnswerField').innerHTML = '___'

  document.getElementById('feedbackMessage').innerText = ''
}

function checkAnswer(userArtikel) {
  // Eğer liste boşsa veya index liste dışındaysa, işlemi durdur
  if (
    !kelimeListesiExercise.length ||
    currentExerciseIndex >= kelimeListesiExercise.length
  ) {
    currentExerciseIndex = 0
    return
  }

  const { artikel, kural, kelime } = kelimeListesiExercise[currentExerciseIndex]
  var buttonDer = document.getElementById('buttonDer')
  var buttonDie = document.getElementById('buttonDie')
  var buttonDas = document.getElementById('buttonDas')

  console.log(`'${currentExerciseIndex}' index böyleydi.`)
  console.log(
    `'${kelimeListesiExercise.length}' kelime listesi uzunlugu böyleydi.`
  )
  let inProgressWords =
    JSON.parse(localStorage.getItem('inProgressWords')) || []
  let learnedWithExerciseWords =
    JSON.parse(localStorage.getItem('learnedWithExerciseWords')) || []

  const currentWord = kelimeListesiExercise[currentExerciseIndex]

  const inProgressIndex = inProgressWords.findIndex(
    (item) => item.almanca === currentWord.almanca
  )

  buttonDer.style.visibility = 'hidden'
  buttonDie.style.visibility = 'hidden'
  buttonDas.style.visibility = 'hidden'
  console.log('Butonlar geçici olarak devre dışı bırakıldı.')

  if (userArtikel.toLowerCase() === artikel.toLowerCase()) {
    document.getElementById('feedbackMessage').innerText = 'Correct! 🎉'
    document.getElementById('feedbackMessage').style.color = 'green'

    // Doğru artikeli göster
    const renk = artikelRenk(artikel)
    document.getElementById(
      'correctAnswerField'
    ).innerHTML = `<span style="color: ${renk};">${artikel}</span>`

    //InProgress listesine kelimeyi ekle - Eger hic dogru bilinmemisse yeni ekle daha önce bilinmisse progress i arttir
    if (inProgressIndex === -1) {
      playSound(
        'https://github.com/heroofdarkroom/proje/raw/refs/heads/master/correct.mp3'
      )
      inProgressWords.push({ almanca: currentWord.almanca, counter: 1 })
      document.getElementById('progressLeft').style.opacity = '1'

      // Liste manipülasyonlarından sonra index kontrolü
      if (currentExerciseIndex >= kelimeListesiExercise.length) {
        currentExerciseIndex = 0
      }

      kelimeListesiExercise.splice(currentExerciseIndex, 1)
      if (kelimeListesiExercise.length > currentExerciseIndex + 4) {
        kelimeListesiExercise.splice(currentExerciseIndex + 4, 0, currentWord)
      } else {
        kelimeListesiExercise.push(currentWord)
      }

      currentExerciseIndex++
      if (currentExerciseIndex >= kelimeListesiExercise.length) {
        currentExerciseIndex = 0
      }
    } else {
      inProgressWords[inProgressIndex].counter += 1
      if (inProgressWords[inProgressIndex].counter === 2) {
        document.getElementById('progressMiddle').style.opacity = '1'
      }
      //3 kere bilindiyse learnede ekle
      if (inProgressWords[inProgressIndex].counter >= 3) {
        playSound(
          'https://github.com/heroofdarkroom/proje/raw/refs/heads/master/streak.mp3'
        )

        learnedWithExerciseWords.push({
          almanca: currentWord.almanca,
          ingilizce: currentWord.ingilizce,
          seviye: currentWord.seviye || 'N/A',
        })

        if (inProgressWords[inProgressIndex].counter === 3) {
          document.getElementById(
            'feedbackMessage'
          ).innerText = `This word: ${currentWord.almanca} added to learned list!🏆`
          document.getElementById('feedbackMessage').style.color = 'green'
          document.getElementById('progressRight').style.opacity = '1'
        }
        updateExerciseCounter()
        kelimeListesiExercise.splice(currentExerciseIndex, 1)
        currentExerciseIndex--
        if (currentExerciseIndex >= kelimeListesiExercise.length) {
          currentExerciseIndex =
            currentExerciseIndex % kelimeListesiExercise.length
          if (currentExerciseIndex == 0) {
            currentExerciseIndex++
          }
        }
        // inProgressWords.splice(inProgressIndex, 1); // inProgressWords'ten çıkar
        console.log(
          `'${currentWord.almanca}' learnedWithExerciseWords listesine taşındı.`
        )
      } else {
        playSound(
          'https://github.com/heroofdarkroom/proje/raw/refs/heads/master/correct.mp3'
        )
        kelimeListesiExercise.splice(currentExerciseIndex, 1)
        if (inProgressWords[inProgressIndex].counter === 1) {
          kelimeListesiExercise.splice(
            currentExerciseIndex + 8,
            0,
            currentWord
          )[0]
        } else {
          kelimeListesiExercise.splice(
            currentExerciseIndex + 12,
            0,
            currentWord
          )[0]
        }
        currentExerciseIndex++
        if (currentExerciseIndex >= kelimeListesiExercise.length) {
          currentExerciseIndex =
            currentExerciseIndex % kelimeListesiExercise.length
          if (currentExerciseIndex == 0) {
            currentExerciseIndex++
          }
        }
      }
    }

    setTimeout(() => {
      document.getElementById('correctAnswerField').innerHTML = '___' // Tekrar boş bırak
      buttonDer.style.visibility = 'visible'
      buttonDie.style.visibility = 'visible'
      buttonDas.style.visibility = 'visible'
      showExerciseWord()
    }, 1000)
    localStorage.setItem(
      'learnedWithExerciseWords',
      JSON.stringify(learnedWithExerciseWords)
    )
  } else {
    if (inProgressIndex !== -1) {
      kelimeListesiExercise.splice(currentExerciseIndex, 1)

      if (kelimeListesiExercise.length > currentExerciseIndex + 10) {
        kelimeListesiExercise.splice(currentExerciseIndex + 10, 0, currentWord)
      } else {
        kelimeListesiExercise.push(currentWord)
      }

      inProgressWords[inProgressIndex].counter = 0
      document.getElementById('progressRight').style.opacity = '0.5'
      document.getElementById('progressMiddle').style.opacity = '0.5'
      document.getElementById('progressLeft').style.opacity = '0.5'

      currentExerciseIndex++
      if (currentExerciseIndex >= kelimeListesiExercise.length) {
        currentExerciseIndex =
          currentExerciseIndex % kelimeListesiExercise.length
        if (currentExerciseIndex == 0) {
          currentExerciseIndex++
        }
      }
    } else {
      currentExerciseIndex++
      if (currentExerciseIndex >= kelimeListesiExercise.length) {
        currentExerciseIndex =
          currentExerciseIndex % kelimeListesiExercise.length
        if (currentExerciseIndex == 0) {
          currentExerciseIndex++
        }
      }
    }
    document.getElementById(
      'feedbackMessage'
    ).innerText = `Upps! ⚠️ Rule: ${kural}`
    document.getElementById('feedbackMessage').style.color = 'red'
    setTimeout(() => {
      document.getElementById('correctAnswerField').innerHTML = '___' // Tekrar boş bırak
      buttonDer.style.visibility = 'visible'
      buttonDie.style.visibility = 'visible'
      buttonDas.style.visibility = 'visible'
      showExerciseWord()
    }, 3000)
  }
  console.log(`'${currentExerciseIndex}' index bu sayiya güncellendi.`)
  console.log(
    `'${kelimeListesiExercise.length}' liste uzunlugu bu sayiya güncellendi.`
  )
  localStorage.setItem('inProgressWords', JSON.stringify(inProgressWords))
}

document
  .getElementById('buttonDer')
  .addEventListener('click', function (event) {
    event.preventDefault() // Sayfanın yukarı kaymasını engeller
    checkAnswer('der')
  })

document
  .getElementById('buttonDie')
  .addEventListener('click', function (event) {
    event.preventDefault()
    checkAnswer('die')
  })

document
  .getElementById('buttonDas')
  .addEventListener('click', function (event) {
    event.preventDefault()
    checkAnswer('das')
  })

// Learn functionality buttons
function repeatLearn() {
  if (!kelimeListesi.length || currentLearnIndex >= kelimeListesi.length) {
    console.log('No words to repeat')
    return
  }

  // Get current word and move it to the end
  const currentWord = kelimeListesi.splice(currentLearnIndex, 1)[0]
  kelimeListesi.push(currentWord)

  // Keep the index within bounds
  currentLearnIndex = currentLearnIndex % kelimeListesi.length

  // Show the next word
  showLearnWord()
}

function iKnowLearn() {
  if (
    !kelimeListesi.length ||
    currentLearnIndex >= kelimeListesi.length ||
    learnedWords >= initialTotalWords
  ) {
    if (iKnowButtons) {
      iKnowButtons.style.visibility = 'hidden'
    }
    if (repeatButtons) {
      repeatButtons.style.visibility = 'hidden'
    }
    return
  }

  let learnedWithLearnWords =
    JSON.parse(localStorage.getItem('learnedWithLearnWords')) || []
  const currentWord = kelimeListesi[currentLearnIndex]

  // Kelimeyi öğrenilenlere ekle
  learnedWithLearnWords.push({
    almanca: currentWord.almanca,
    ingilizce: currentWord.ingilizce,
    seviye: currentWord.seviye || 'N/A',
  })

  if (learnedWords < initialTotalWords) {
    learnedWords++
    localStorage.setItem('learnedWords', learnedWords)

    learnedWithLearnWords.push({
      almanca: currentWord.almanca,
      ingilizce: currentWord.ingilizce,
      seviye: currentWord.seviye || 'N/A',
    })
    localStorage.setItem(
      'learnedWithLearnWords',
      JSON.stringify(learnedWithLearnWords)
    )

    kelimeListesi.splice(currentLearnIndex, 1)

    document.getElementById('remainingWordsCountLearn').innerText = learnedWords
    document.getElementById('totalWordsCountLearn').innerText =
      initialTotalWords

    if (learnedWords >= initialTotalWords) {
      showModal('You learned all words! 🎉')
      if (iKnowButtons) {
        iKnowButtons.style.visibility = 'hidden'
      }
      if (repeatButtons) {
        repeatButtons.style.visibility = 'hidden'
      }
    }

    if (kelimeListesi.length > 0) {
      currentLearnIndex = currentLearnIndex % kelimeListesi.length
      showLearnWord()
    }
  }
}

// Add event listeners for learn buttons
document.addEventListener('DOMContentLoaded', () => {
  setupEventListeners() // İlk yüklemede çağır
})

// ... existing code ...

function setupEventListeners() {
  try {
    // Butonları ID ile seçelim
    const repeatButton = document.getElementById('repeatButtonLearn')
    const iKnowButton = document.getElementById('iKnowButtonLearn')

    setupListenerForIknowAndLearn(iKnowButton, repeatButton)

    const repeatButtonVerb = document.getElementById('repeatButtonLearnVerb')
    const iKnowButtonVerb = document.getElementById('iKnowButtonLearnVerb')

    const outfav = document.getElementById('outfav')
    const infav = document.getElementById('infav')

    // Favorite buttons
    if (outfav && !outfav.hasAttribute('listener-attached')) {
      outfav.addEventListener('click', addToFavorites)
      outfav.setAttribute('listener-attached', 'true')
    }

    if (infav && !infav.hasAttribute('listener-attached')) {
      infav.addEventListener('click', removeFavorite)
      infav.setAttribute('listener-attached', 'true')
    }
  } catch (error) {
    console.error('Error in setupEventListeners:', error)
  }
}

function setupListenerForIknowAndLearn(iKnowButton, repeatButton) {
  // Repeat button
  if (repeatButton && !repeatButton.hasAttribute('listener-attached')) {
    repeatButton.addEventListener('click', function (event) {
      event.preventDefault()
      repeatLearn()
    })
    repeatButton.setAttribute('listener-attached', 'true')
  }

  // I Know button
  if (iKnowButton && !iKnowButton.hasAttribute('listener-attached')) {
    iKnowButton.addEventListener('click', function (event) {
      event.preventDefault()
      iKnowLearn()
    })
    iKnowButton.setAttribute('listener-attached', 'true')
  }
}

// DOMContentLoaded event listener
document.addEventListener('DOMContentLoaded', () => {
  try {
    setupEventListeners()

    // Sayfa değişimlerini izle
    const observer = new MutationObserver((mutations) => {
      // Sadece gerekli değişikliklerde event listener'ları güncelle
      const shouldUpdate = mutations.some((mutation) => {
        return Array.from(mutation.addedNodes).some(
          (node) =>
            node.nodeType === 1 && // Element node
            (node.id === 'repeatButtonLearn' ||
              node.id === 'iKnowButtonLearn' ||
              node.id === 'outfav' ||
              node.id === 'infav')
        )
      })

      if (shouldUpdate) {
        setupEventListeners()
      }
    })

    // Sadece body içindeki değişiklikleri izle
    observer.observe(document.body, {
      childList: true,
      subtree: true,
    })
  } catch (error) {
    console.error('Error in DOMContentLoaded:', error)
  }
})

document.addEventListener('DOMContentLoaded', function () {
  document
    .querySelector('#email-form')
    .addEventListener('submit', function (event) {
      event.preventDefault() // Formun hemen gönderilmesini engeller
      gtag_report_conversion()

      setTimeout(() => {
        this.submit() // Google Ads dönüşüm takibinin ardından formu gönder
      }, 300) // 300ms bekleyerek Google Ads dönüşümünün çalışmasını bekler
    })
})

function updateExerciseCounter() {
  correctAnswerWordsCounter++
  localStorage.setItem('correctAnswerWordsCounter', correctAnswerWordsCounter)

  document.getElementById('remainingWordsCountExercise').innerText =
    correctAnswerWordsCounter
  document.getElementById('totalWordsCountExercise').innerText =
    initialTotalWords

  if (correctAnswerWordsCounter >= initialTotalWords) {
    showModalExercise('You completed all exercise words! 🎉')
    var buttonDer = document.getElementById('buttonDer')
    var buttonDie = document.getElementById('buttonDie')
    var buttonDas = document.getElementById('buttonDas')

    buttonDer.style.visibility = 'hidden'
    buttonDie.style.visibility = 'hidden'
    buttonDas.style.visibility = 'hidden'

    document.getElementById('feedbackMessage').innerText =
      'You completed all exercise words! 🎉'
  }
}

function addToFavorites() {
  const inFavImage = document.getElementById('infav')
  const outFavImage = document.getElementById('outfav')
  const feedbackElement = document.getElementById('favoritesFeedback')

  if (kelimeListesi.length === 0 || currentLearnIndex >= kelimeListesi.length) {
    feedbackElement.innerText = 'No word to add to favorites!'
    feedbackElement.style.color = 'red'
    feedbackElement.style.display = 'block'
    setTimeout(() => {
      feedbackElement.style.display = 'none'
    }, 3000)
    return
  }

  const currentWord = kelimeListesi[currentLearnIndex]
  let favoriteWords = JSON.parse(localStorage.getItem('favoriteWords')) || []
  const isFavorite = isItInFavorites(currentWord, favoriteWords)

  // Favorilere ekle
  favoriteWords.push({
    almanca: currentWord.almanca,
    ingilizce: currentWord.ingilizce,
    seviye: currentWord.seviye || 'N/A',
  })
  localStorage.setItem('favoriteWords', JSON.stringify(favoriteWords))

  feedbackElement.innerText = `"${currentWord.almanca}" has been added to favorites!`
  feedbackElement.style.color = 'green'

  // Görselleri güncelle
  inFavImage.style.display = 'block' // infav göster
  outFavImage.style.display = 'none' // outfav gizle

  feedbackElement.style.display = 'block'
  setTimeout(() => {
    feedbackElement.style.display = 'none'
  }, 2000)
}

function isItInFavorites(currentWord, favoriteWords) {
  return favoriteWords.some((word) => word.almanca === currentWord.almanca)
}

function updateFavoriteIcons() {
  const inFavImage = document.getElementById('infav')
  const outFavImage = document.getElementById('outfav')

  const currentWord = kelimeListesi[currentLearnIndex]
  const favoriteWords = JSON.parse(localStorage.getItem('favoriteWords')) || []
  const isFavorite = isItInFavorites(currentWord, favoriteWords)

  if (isFavorite) {
    inFavImage.style.display = 'block' // Görseli görünür yap
    outFavImage.style.display = 'none' // Diğerini gizle
  } else {
    inFavImage.style.display = 'none' // Görseli gizle
    outFavImage.style.display = 'block' // Diğerini görünür yap
  }
}

function removeFavorite() {
  // Favorilerden kaldır
  const feedbackElement = document.getElementById('favoritesFeedback')
  const currentWord = kelimeListesi[currentLearnIndex]
  let favoriteWords = JSON.parse(localStorage.getItem('favoriteWords')) || []
  favoriteWords = favoriteWords.filter(
    (word) => word.almanca !== currentWord.almanca
  )
  localStorage.setItem('favoriteWords', JSON.stringify(favoriteWords))

  feedbackElement.innerText = `"${currentWord.almanca}" has been removed from favorites.`
  feedbackElement.style.color = 'orange'

  feedbackElement.style.display = 'block'
  setTimeout(() => {
    feedbackElement.style.display = 'none'
  }, 2000)
  // Görselleri güncelle
  updateFavoriteIcons()
}

function navigateToPage(pageId) {
  showSkeleton()
  setTimeout(() => {
    document.querySelectorAll('.page').forEach((page) => {
      page.style.display = 'none'
    })
    document.getElementById(pageId).style.display = 'block'
    hideSkeleton()

    // Sayfa değişiminde buton kontrolü
    if (learnedWords >= initialTotalWords) {
      document.getElementById('iKnowButtonLearn').style.visibility = 'hidden'
      document.getElementById('repeatButtonLearn').style.visibility = 'hidden'
    }
    if (learnedWithExerciseWords >= initialTotalWords) {
      document.getElementById('buttonDer').style.visibility = 'hidden'
      document.getElementById('buttonDie').style.visibility = 'hidden'
      document.getElementById('buttonDas').style.visibility = 'hidden'
    }
  }, 500)
}

document.addEventListener('DOMContentLoaded', async () => {
  showSkeleton()

  try {
    const lastSelectedTopic =
      localStorage.getItem('lastSelectedTopic') || 'b1telcpt1'
    await loadWords(lastSelectedTopic)
    showLearnWord()
    showExerciseWord()

    // Sayfa yüklendiğinde buton kontrolü
    if (learnedWords >= initialTotalWords) {
      document.getElementById('iKnowButtonLearn').style.visibility = 'hidden'
      document.getElementById('repeatButtonLearn').style.visibility = 'hidden'
    }
    if (learnedWithExerciseWords >= initialTotalWords) {
      document.getElementById('buttonDer').style.visibility = 'hidden'
      document.getElementById('buttonDie').style.visibility = 'hidden'
      document.getElementById('buttonDas').style.visibility = 'hidden'
    }
  } catch (error) {
    console.error('Başlangıç yüklemesi hatası:', error)
  } finally {
    hideSkeleton()
  }
})

function resetExerciseButtons() {
  var buttonDer = document.getElementById('buttonDer')
  var buttonDie = document.getElementById('buttonDie')
  var buttonDas = document.getElementById('buttonDas')

  if (buttonDer && buttonDie && buttonDas) {
    // **Butonları tekrar görünür hale getir**
    buttonDer.style.visibility = 'visible'
    buttonDie.style.visibility = 'visible'
    buttonDas.style.visibility = 'visible'

    // **Önce eski event listener'ları kaldır**
    var newButtonDer = buttonDer.cloneNode(true)
    var newButtonDie = buttonDie.cloneNode(true)
    var newButtonDas = buttonDas.cloneNode(true)

    buttonDer.parentNode.replaceChild(newButtonDer, buttonDer)
    buttonDie.parentNode.replaceChild(newButtonDie, buttonDie)
    buttonDas.parentNode.replaceChild(newButtonDas, buttonDas)

    // **Yeni event listener'ları ekleyelim**
    newButtonDer.addEventListener('click', function (event) {
      event.preventDefault()
      checkAnswer('der')
    })

    newButtonDie.addEventListener('click', function (event) {
      event.preventDefault()
      checkAnswer('die')
    })

    newButtonDas.addEventListener('click', function (event) {
      event.preventDefault()
      checkAnswer('das')
    })

    console.log('🔥 Der, Die, Das butonları tekrar aktif hale getirildi.')
  }
}

function showModal(message) {
  var modal = document.getElementById('customModal')
  var modalMessage = document.getElementById('modalMessage')
  var closeButton = document.querySelector('.close-button')

  modalMessage.innerText = message // **Mesajı değiştir**
  modal.style.display = 'block' // **Modali aç**

  closeButton.addEventListener('click', function () {
    modal.style.display = 'none' // **Kapatma butonuna tıklanınca gizle**
    resetExerciseButtons() // **🔥 Butonları tekrar aktif et**
  })

  setTimeout(() => {
    modal.style.display = 'none' // **3 saniye sonra otomatik kapanır**
    resetExerciseButtons() // **🔥 Butonları tekrar aktif et**
  }, 3000)
}

function showModalExercise(message) {
  var modal = document.getElementById('customModalExercise')
  var modalMessage = document.getElementById('modalMessageExercise')
  var closeButton = document.querySelector('.close-button')

  modalMessage.innerText = message // **Mesajı değiştir**
  modal.style.display = 'block' // **Modali aç**

  closeButton.addEventListener('click', function () {
    modal.style.display = 'none' // **Kapatma butonuna tıklanınca gizle**
    resetExerciseButtons() // **🔥 Butonları tekrar aktif et**
  })

  setTimeout(() => {
    modal.style.display = 'none' // **3 saniye sonra otomatik kapanır**
    resetExerciseButtons() // **🔥 Butonları tekrar aktif et**
  }, 3000)
}

function playSound(audioUrl) {
  const audio = new Audio(audioUrl)
  audio.play()
}

function gtag_report_conversion(url) {
  var callback = function () {
    if (typeof url !== 'undefined') {
      window.location = url
    }
  }

  gtag('event', 'conversion', {
    send_to: 'AW-16867938378/ChUxCNiDnZ8aEMqgoes-',
    event_callback: callback,
  })

  return false // Sayfanın hemen yönlendirilmesini engeller, gtag'ın çalışmasını bekler.
}

$('a').click(function () {
  $('nav').removeClass('w--open')
})
$('a').click(function () {
  $('div').removeClass('w--open')
})
