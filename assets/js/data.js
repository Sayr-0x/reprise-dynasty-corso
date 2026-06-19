/* =============================================================
   DYNASTY 8 — Données du site (modifiable sans toucher au code)
   Pour ajouter un bien : copiez un bloc { ... } et changez les valeurs.
   ============================================================= */

window.D8 = {

  /* ---------- BIENS À VENDRE ---------- */
  properties: [
    {
      id: "VH-001",
      title: "Villa panoramique — Vinewood Hills",
      type: "Villa",
      hood: "Vinewood Hills",
      price: 4250000,
      beds: 5, baths: 4, surface: 540,
      status: "À vendre",
      featured: true,
      tags: ["Piscine", "Vue ville", "Garage 4"],
      img: "https://images.unsplash.com/photo-1613977257363-707ba9348227?q=80&w=1400&auto=format&fit=crop",
      desc: "Villa contemporaine perchée sur les hauteurs, baies vitrées plein ciel, piscine à débordement face au skyline de Los Santos. Domotique intégrale et sécurité 24/7."
    },
    {
      id: "RH-002",
      title: "Manoir classique — Rockford Hills",
      type: "Villa",
      hood: "Rockford Hills",
      price: 6900000,
      beds: 6, baths: 6, surface: 720,
      status: "Exclusivité",
      featured: true,
      tags: ["Parc privé", "Home cinéma", "Cave"],
      img: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=1400&auto=format&fit=crop",
      desc: "Demeure d'exception sur parc arboré, dans le quartier le plus huppé de l'État. Réception de 200 m², suite parentale avec dressing, cave à vins et personnel de maison."
    },
    {
      id: "DP-003",
      title: "Penthouse vue océan — Del Perro",
      type: "Penthouse",
      hood: "Del Perro",
      price: 3100000,
      beds: 3, baths: 3, surface: 280,
      status: "À vendre",
      featured: true,
      tags: ["Rooftop", "Vue mer", "Concierge"],
      img: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?q=80&w=1400&auto=format&fit=crop",
      desc: "Dernier étage d'une tour de standing en front de mer. Terrasse panoramique, accès direct à la plage de Del Perro et conciergerie privée."
    },
    {
      id: "MP-004",
      title: "Maison d'architecte — Mirror Park",
      type: "Maison",
      hood: "Mirror Park",
      price: 1450000,
      beds: 3, baths: 2, surface: 210,
      status: "À vendre",
      featured: false,
      tags: ["Jardin", "Bureau", "Quartier branché"],
      img: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?q=80&w=1400&auto=format&fit=crop",
      desc: "Maison lumineuse au cœur du quartier le plus créatif de la ville. Cuisine ouverte, patio végétalisé, à deux pas des cafés et boutiques de Mirror Park."
    },
    {
      id: "VC-005",
      title: "Loft bord de plage — Vespucci",
      type: "Appartement",
      hood: "Vespucci Beach",
      price: 980000,
      beds: 2, baths: 2, surface: 150,
      status: "À vendre",
      featured: false,
      tags: ["Front de mer", "Terrasse", "Meublé"],
      img: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=1400&auto=format&fit=crop",
      desc: "Loft ouvert sur la promenade de Vespucci. Volumes industriels, terrasse face au coucher de soleil et ambiance balnéaire à toute heure."
    },
    {
      id: "DT-006",
      title: "Appartement standing — Downtown",
      type: "Appartement",
      hood: "Downtown",
      price: 720000,
      beds: 2, baths: 1, surface: 120,
      status: "À vendre",
      featured: false,
      tags: ["Gratte-ciel", "Salle de sport", "Parking"],
      img: "https://images.unsplash.com/photo-1493809842364-78817add7ffb?q=80&w=1400&auto=format&fit=crop",
      desc: "Au cœur des affaires, dans une tour avec salle de sport, spa et gardien. Idéal pied-à-terre professionnel pour cadres et entrepreneurs."
    },
    {
      id: "RH-007",
      title: "Villa moderne piscine — Richman",
      type: "Villa",
      hood: "Richman",
      price: 5400000,
      beds: 5, baths: 5, surface: 610,
      status: "Exclusivité",
      featured: false,
      tags: ["Piscine", "Tennis", "Sécurisé"],
      img: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?q=80&w=1400&auto=format&fit=crop",
      desc: "Propriété sécurisée derrière hauts murs, court de tennis privé, pool-house et garage pour collection automobile. Le luxe sans ostentation."
    },
    {
      id: "PB-008",
      title: "Chalet vue baie — Paleto Bay",
      type: "Maison",
      hood: "Paleto Bay",
      price: 640000,
      beds: 3, baths: 2, surface: 190,
      status: "À vendre",
      featured: false,
      tags: ["Nature", "Cheminée", "Calme"],
      img: "https://images.unsplash.com/photo-1449844908441-8829872d2607?q=80&w=1400&auto=format&fit=crop",
      desc: "Refuge en bois au nord de l'État, entre forêt et océan. Parfait pour s'éloigner de l'agitation de la ville sans renoncer au confort."
    },
    {
      id: "SS-009",
      title: "Ranch & terres — Grapeseed",
      type: "Maison",
      hood: "Grapeseed",
      price: 1150000,
      beds: 4, baths: 2, surface: 320,
      status: "À vendre",
      featured: false,
      tags: ["Écurie", "Grange", "Terrain XXL"],
      img: "https://images.unsplash.com/photo-1500076656116-558758c991c1?q=80&w=1400&auto=format&fit=crop",
      desc: "Authentique ranch agricole avec écurie, grange et plusieurs hectares de terres exploitables. Idéal projet RP agricole ou équestre."
    }
  ],

  /* ---------- STOCKAGE / HANGARS ---------- */
  storage: [
    { id:"H-101", title:"Grand hangar logistique — Cypress Flats", hood:"Cypress Flats", price:1450000, surface:1200, label:"Accès poids lourds", img:"https://images.unsplash.com/photo-1553413077-190dd305871c?q=80&w=1200&auto=format&fit=crop", desc:"Hangar industriel à grand volume, quais de chargement et accès direct pour semi-remorques. Idéal entreprise de transport." },
    { id:"H-102", title:"Hangar aéroportuaire — LSIA", hood:"LSIA · Aéroport", price:3200000, surface:1800, label:"Accès tarmac", img:"https://images.unsplash.com/photo-1474302770737-173ee21bab63?q=80&w=1200&auto=format&fit=crop", desc:"Hangar avec accès piste, hauteur sous plafond XXL. Stockage d'aéronefs, jets privés ou flotte de véhicules." },
    { id:"H-103", title:"Entrepôt sécurisé — Port de Los Santos", hood:"La Puerta", price:2100000, surface:1500, label:"Sécurité renforcée", img:"https://images.unsplash.com/photo-1601598851547-4302969d0614?q=80&w=1200&auto=format&fit=crop", desc:"Entrepôt portuaire clôturé, vidéosurveillance et accès conteneurs. Parfait import-export." },
    { id:"H-104", title:"Garage privé multi-véhicules — Mirror Park", hood:"Mirror Park", price:680000, surface:320, label:"10 véhicules", img:"https://images.unsplash.com/photo-1486006920555-c77dcf18193c?q=80&w=1200&auto=format&fit=crop", desc:"Garage fermé pour collection automobile, sol époxy, atelier intégré et station de lavage." },
    { id:"H-105", title:"Box de stockage individuels — Strawberry", hood:"Strawberry", price:240000, surface:60, label:"Accès 24/7", img:"https://images.unsplash.com/photo-1558997519-83ea9252edf8?q=80&w=1200&auto=format&fit=crop", desc:"Box sécurisé en self-stockage, accès badge 24h/24. Idéal stock de marchandises ou archives." },
    { id:"H-106", title:"Hangar agricole — Grapeseed", hood:"Grapeseed", price:520000, surface:900, label:"Volume XXL", img:"https://images.unsplash.com/photo-1605338803155-8b46c0f0a9a3?q=80&w=1200&auto=format&fit=crop", desc:"Vaste hangar ouvert pour matériel agricole, récoltes ou flotte d'engins. Terrain attenant." }
  ],

  /* ---------- SERVICES ---------- */
  services: [
    { icon:"key", title:"Vente de biens", text:"Mise en marché, photographie, visites et négociation jusqu'à la signature." },
    { icon:"search", title:"Recherche sur-mesure", text:"Vous décrivez le bien idéal, nos agents le dénichent — y compris en off-market." },
    { icon:"chart", title:"Estimation & conseil", text:"Évaluation gratuite et confidentielle de la valeur réelle de votre patrimoine." },
    { icon:"home", title:"Gestion locative", text:"Recherche de locataires, encaissement des loyers et entretien délégué." },
    { icon:"build", title:"Promotion & construction", text:"Du terrain nu au bien livré clés en main, conçu selon vos envies." },
    { icon:"crown", title:"Conciergerie prestige", text:"Service VIP post-acquisition : sécurité, personnel, entretien, événements." }
  ],

  /* ---------- ÉQUIPE ---------- */
  team: [
    { name:"Corso", role:"PDG · Direction", initials:"C", note:"Vision, stratégie et mandats prestige." },
    { name:"À définir", role:"Directeur commercial", initials:"DC", note:"Pilotage de l'équipe de vente." },
    { name:"À définir", role:"Agent senior", initials:"AS", note:"Mandats exclusifs & grandes fortunes." },
    { name:"À définir", role:"Agent immobilier", initials:"AI", note:"Ventes courantes & prospection." },
    { name:"À définir", role:"Gestionnaire locatif", initials:"GL", note:"Suivi des loyers & conciergerie." },
    { name:"Recrutement", role:"Poste ouvert", initials:"+", note:"Rejoignez la maison Dynasty 8.", open:true }
  ],

  /* ---------- QUARTIERS ---------- */
  hoods: [
    { name:"Vinewood Hills", tag:"Villas panoramiques", img:"https://images.unsplash.com/photo-1580587771525-78b9dba3b914?q=80&w=1000&auto=format&fit=crop" },
    { name:"Rockford Hills", tag:"Adresses de prestige", img:"https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=1000&auto=format&fit=crop" },
    { name:"Del Perro", tag:"Front de mer", img:"https://images.unsplash.com/photo-1493246507139-91e8fad9978e?q=80&w=1000&auto=format&fit=crop" },
    { name:"Mirror Park", tag:"Quartier branché", img:"https://images.unsplash.com/photo-1570129477492-45c003edd2be?q=80&w=1000&auto=format&fit=crop" }
  ],

  /* ---------- MOTS DÉFILANTS (titre hero) ---------- */
  rotatingWords: ["de dynastie", "de prestige", "d'exception", "de caractère", "qui vous ressemble"],

  /* ---------- TÉMOIGNAGES ---------- */
  testimonials: [
    { quote:"Une villa trouvée en deux jours, négociation impeccable. Dynasty 8 a tenu chaque promesse.", name:"Marcus Reed", role:"Entrepreneur · Rockford Hills", initials:"MR" },
    { quote:"Service haut de gamme du premier appel à la remise des clés. On se sent unique.", name:"Elena Vasquez", role:"Investisseuse · Del Perro", initials:"EV" },
    { quote:"J'ai confié la vente de mon penthouse en exclusivité. Vendu au-dessus du prix espéré.", name:"Jonathan Pike", role:"Propriétaire · Downtown", initials:"JP" }
  ]
};
