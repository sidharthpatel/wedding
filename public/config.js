// Edit this file to personalise the site. No build step needed.
window.WEDDING = {
  groom: "Sidharth",
  groomGu: "", // optional: name in Gujarati script, e.g. "સિદ્ધાર્થ"
  bride: "Your Partner", // TODO: replace with her name
  brideGu: "", // optional Gujarati spelling
  weddingDate: "2027-01-29T10:00:00", // local time of the ceremony
  city: "City, State", // TODO
  cityGu: "",
  taglineGu: "અમારા પરિવારો સાથે, અમારા લગ્નની ઉજવણીમાં જોડાવા માટે અમે આપને હૃદયપૂર્વક આમંત્રિત કરીએ છીએ",
  tagline: "Together with our families, we joyfully invite you to celebrate our wedding",

  // Set date/time/venue to null to show "Details coming soon".
  events: [
    {
      id: "ganesh-puja",
      blurbGu: "અમે નવા અધ્યાયની શરૂઆત ભગવાન ગણેશના આશીર્વાદ સાથે કરીએ છીએ.",
      dressGu: "પરંપરાગત ભારતીય પોશાક",
      name: "Ganesh Puja",
      gu: "ગણેશ પૂજા",
      icon: "🪔",
      blurb: "We begin by seeking the blessings of Lord Ganesha for a new chapter.",
      date: null, time: null, venue: null, address: null, map: null,
      dress: "Traditional Indian", colors: ["#F4B73B", "#FFF3D6"],
    },
    {
      id: "mehndi",
      blurbGu: "મહેંદી, સંગીત અને હાસ્યથી ભરેલી બપોર.",
      dressGu: "લીલા અને પીળા રંગો",
      name: "Mehndi",
      gu: "મહેંદી",
      icon: "🌿",
      blurb: "An afternoon of henna, music and laughter.",
      date: null, time: null, venue: null, address: null, map: null,
      dress: "Greens & yellows", colors: ["#5E8C4A", "#E8C547"],
    },
    {
      id: "haldi",
      blurbGu: "પરિવાર અને મિત્રો તરફથી હળદરનો સોનેરી આશીર્વાદ.",
      dressGu: "પીળા અને સફેદ રંગ (એવા કપડાં જે ડાઘ પડે તો વાંધો નહીં!)",
      name: "Haldi / Pithi",
      gu: "પીઠી",
      icon: "🌼",
      blurb: "A golden blessing of turmeric from family and friends.",
      date: null, time: null, venue: null, address: null, map: null,
      dress: "Yellows & whites (clothes you don't mind staining!)", colors: ["#F2B705", "#FFFFFF"],
    },
    {
      id: "garba",
      blurbGu: "દાંડિયા, ઢોલના તાલ અને ક્યારેય ન અટકતું નૃત્ય.",
      dressGu: "ચણિયાચોળી / કેડિયું — રંગબેરંગી અને ગરબા રમવા માટે અનુકૂળ",
      name: "Garba & Sangeet",
      gu: "ગરબા",
      icon: "💃",
      blurb: "Dandiya sticks, dhol beats and a dance floor that doesn't stop.",
      date: null, time: null, venue: null, address: null, map: null,
      dress: "Chaniya choli / kediyu — colourful and twirl-friendly", colors: ["#C2185B", "#FF8F00", "#1E88E5"],
    },
    {
      id: "wedding",
      blurbGu: "જાન, જયમાળા, ફેરા અને સપ્તપદી — ઉજવણીનું હૃદય.",
      dressGu: "ઘેરા રત્ન-રંગો, લાલ અને સોનેરી",
      name: "Wedding Ceremony",
      gu: "લગ્ન",
      icon: "🔥",
      blurb: "Baraat, Jaimala, Pheras and Saptapadi — the heart of the celebration.",
      date: "2027-01-29", time: null, venue: null, address: null, map: null,
      dress: "Rich jewel tones, reds & golds", colors: ["#9B1B30", "#D4A24C"],
    },
  ],

  // Optional extras shown in the "Good to know" section.
  // [question, answer, question (Gujarati), answer (Gujarati)]
  faq: [
    ["Is there a reception?", "No — the wedding ceremony and the celebrations around it are the main event, and we'd love to share all of it with you.",
      "શું રિસેપ્શન છે?", "ના — લગ્ન સમારોહ અને તેની આસપાસના કાર્યક્રમો જ મુખ્ય ઉજવણી છે, અને અમે તે બધું તમારી સાથે માણવા માગીએ છીએ."],
    ["Can I bring a guest or my kids?", "Your invitation lists exactly who is invited. If you have questions, reach out to us directly.",
      "શું હું મહેમાન અથવા બાળકોને લાવી શકું?", "તમારા આમંત્રણમાં આમંત્રિત લોકોના નામ દર્શાવેલ છે. કોઈ પ્રશ્ન હોય તો સીધો અમારો સંપર્ક કરો."],
    ["Is the food vegetarian?", "Yes — traditional Gujarati vegetarian fare. Let us know about allergies in the RSVP form.",
      "શું ભોજન શાકાહારી છે?", "હા — પરંપરાગત ગુજરાતી શાકાહારી ભોજન. એલર્જી હોય તો આરએસવીપી ફોર્મમાં જણાવો."],
    ["I've never been to an Indian wedding!", "Perfect. Come curious, come hungry. We'll explain the ceremonies as we go.",
      "મેં ક્યારેય ભારતીય લગ્ન જોયા નથી!", "બહુ સરસ. જિજ્ઞાસા અને ભૂખ સાથે આવો. અમે વિધિઓ સમજાવતા જઈશું."],
    ["Where should I stay?", "Hotel and travel details will be added here soon.",
      "મારે ક્યાં રોકાવું?", "હોટેલ અને મુસાફરીની માહિતી જલ્દી અહીં ઉમેરવામાં આવશે."],
  ],


  rsvpDeadline: "December 15, 2026", // shown on the form
  contactEmail: "spsid1711@gmail.com",
};
