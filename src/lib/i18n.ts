export type Locale = "en" | "ja";

export const locales: Locale[] = ["en", "ja"];
export const defaultLocale: Locale = "en";

/** Translations for UI strings. */
export const translations = {
  en: {
    // Site
    tagline: "AI, made visible.",
    description: "Short, sourced explainers on how AI actually works. One concept at a time, with every claim checked.",

    // Navigation
    explainers: "Explainers",
    about: "About",
    newsletter: "Newsletter",
    radar: "Radar",
    rss: "RSS",
    site: "Site",
    elsewhere: "Elsewhere",

    // Home
    brand: "Laksh | AI Explained",
    heroDescription: "Short explainers on how AI actually works. One concept at a time, in plain words, with every claim sourced.",
    startWatching: "Start watching",
    getByEmail: "Get them by email",
    latest: "New",
    latestExplainers: "Latest explainers",
    all: "All",
    radarLabel: "What I'm watching for the next one",

    // How section
    howMade: "How these are made",
    accurateFirst: "Accurate first, pretty second.",
    step1Title: "One concept",
    step1Desc: "Each video explains exactly one idea, in about 40 seconds.",
    step2Title: "Every claim sourced",
    step2Desc: "Each page lists every source, so you can check the work.",
    step3Title: "Illustrations are labelled",
    step3Desc: "When an animation simplifies what really happens, the video says so.",

    // About
    aboutTitle: "About",
    hiImLaksh: "Hi, I'm Laksh.",
    aboutIntro: "I make short videos that explain how AI actually works, one concept at a time, without the hype and without the jargon.",
    whatThisIs: "What this is",
    whatThisIsDesc: 'Laksh | AI Explained is a series of short videos, each on a single AI concept: how tokenization works, why a long chat "forgets", what an AI agent actually did. Every video has a page here with a written version and the sources behind each claim.',
    rulesTitle: "The rules I follow",
    rule1: "One concept per video. If it needs two ideas, it becomes two videos.",
    rule2: "Accuracy over spectacle. Every claim is checked against a source, and the sources are listed on the page.",
    rule3: "Illustrations are labelled. When an animation simplifies what happens inside a model, it says so. It never pretends to show the real internals.",
    rule4: "Educational, never promotional.",
    whyAvatar: "Why the avatar?",
    whyAvatarDesc: "The pixel-art character is my on-screen co-host. It keeps the focus on the idea, not on me. That will change a little when I start on YouTube, where I'll show up on camera for longer experiments.",
    getInTouch: "Get in touch",
    getInTouchDesc: "Corrections, topic ideas and collaboration requests go to",
    newExplainers: "New explainers come out on",
    instagram: "Instagram",
    andLandIn: "first, and land in the",

    // Explainers
    archive: "Archive",
    allExplainers: "All explainers",
    explainersDesc: "Each one is a short video, a written version you can skim, and the sources for every claim.",
    allExplainersBack: "← All explainers",
    by: "By",
    updated: "Updated",
    minRead: "min read",
    watchReel: "Watch the reel",
    watch: "Watch",
    inShort: "In short",
    sources: "Sources",
    spottedMistake: "Spotted a mistake?",
    tellMe: "Tell me",
    andIllFix: "and I'll fix it.",
    watchNext: "Watch next",

    // Newsletter
    newsletterHeadline: "New explainer? You hear first.",
    newsletterDesc: "Each one is a single AI concept, explained in plain words, with the sources linked.",
    followInstead: null, // null means show the newsletter form

    // Footer
    copyright: "Every claim sourced",
    youtube: "YouTube",
    comingSoon: "coming soon",

    // Accessibility
    skipToContent: "Skip to content",
    home: "home",
  },
  ja: {
    // Site
    tagline: "AIを、目に見えるかたちで。",
    description: "AIの仕組みを、1つのコンセプトずつ、わかりやすい言葉で、出典付きで解説します。",

    // Navigation
    explainers: "解説",
    about: "このサイトについて",
    newsletter: "Newsletter",
    radar: "Radar",
    rss: "RSS",
    site: "サイト",
    elsewhere: "その他",

    // Home
    brand: "Laksh | AI Explained",
    heroDescription: "AIの仕組みを短く解説。1つのコンセプトを、わかりやすい言葉で、すべての主張に出典を付けて。",
    startWatching: "解説を見る",
    getByEmail: "メールで受け取る",
    latest: "新着",
    latestExplainers: "最新の解説",
    all: "すべて",
    radarLabel: "次回の解説で取り上げる予定のトピック",

    // How section
    howMade: "解説の作り方",
    accurateFirst: "見た目より、正確さを優先。",
    step1Title: "1つのコンセプト",
    step1Desc: "各動画は1つのアイデアだけを約40秒で解説します。",
    step2Title: "すべての主張に出典",
    step2Desc: "各ページにすべての出典を記載し、検証できるようにしています。",
    step3Title: "図解には注釈付き",
    step3Desc: "アニメーションが実際の動作を簡略化している場合は、動画内でその旨を説明します。",

    // About
    aboutTitle: "このサイトについて",
    hiImLaksh: "こんにちは、Lakshです。",
    aboutIntro: "AIの仕組みを、誇大広告や専門用語なしで、1つのコンセプトずつ解説する短い動画を作っています。",
    whatThisIs: "このサイトについて",
    whatThisIsDesc: "Laksh | AI Explainedは、AIの1つのコンセプトについて解説する短い動画シリーズです。トークン化の仕組み、長いチャットが「忘れる」理由、AIエージェントが実際に行ったことなど。すべての動画には、このサイトに文章版と各主張の出典があります。",
    rulesTitle: "守っているルール",
    rule1: "1動画につき1コンセプト。2つのアイデアが必要なら、2本の動画にします。",
    rule2: "派手さより正確さ。すべての主張は出典と照合し、出典はページに記載します。",
    rule3: "図解には注釈付き。モデル内部の動作を簡略化したアニメーションの場合は、その旨を明示します。実際の内部構造を見せているふりはしません。",
    rule4: "教育目的であり、宣伝目的ではありません。",
    whyAvatar: "なぜアバター?",
    whyAvatarDesc: "ピクセルアートのキャラクターは、私の画面上の相棒です。焦点をアイデアに置き、私自身には置かないようにしています。YouTubeを始めたら少し変わるかもしれません。そこではより長い実験のために実際にカメラに映ります。",
    getInTouch: "お問い合わせ",
    getInTouchDesc: "訂正、トピックのアイデア、コラボレーションのご依頼は",
    newExplainers: "新しい解説は",
    instagram: "Instagram",
    andLandIn: "で最初に公開し、",

    // Explainers
    archive: "アーカイブ",
    allExplainers: "すべての解説",
    explainersDesc: "それぞれが短い動画、読み流せる文章版、すべての主張の出典で構成されています。",
    allExplainersBack: "← すべての解説",
    by: "作成者",
    updated: "更新日",
    minRead: "分で読めます",
    watchReel: "リールを見る",
    watch: "見る",
    inShort: "要約",
    sources: "出典",
    spottedMistake: "間違いを見つけましたか?",
    tellMe: "教えてください",
    andIllFix: "修正します。",
    watchNext: "次の解説",

    // Newsletter
    newsletterHeadline: "新しい解説が出たら、いち早くお届け。",
    newsletterDesc: "AIの1つのコンセプトを、わかりやすい言葉で、出典付きで解説します。",
    followInstead: "@laksh.explains.jp をフォロー", // Show follow link instead of form

    // Footer
    copyright: "すべての主張に出典付き",
    youtube: "YouTube",
    comingSoon: "近日公開",

    // Accessibility
    skipToContent: "コンテンツにスキップ",
    home: "ホーム",
  },
} as const;

export type TranslationKey = keyof (typeof translations)["en"];

export function t(locale: Locale, key: TranslationKey): string {
  return translations[locale][key] ?? translations.en[key] ?? key;
}

/** Get the pillar labels for a locale. */
export const pillarTranslations = {
  en: {
    llms: "Understanding AI and LLMs",
    systems: "How AI systems actually work",
    infra: "AI infrastructure and engineering",
    agents: "AI agents and automation",
    applied: "Real-world applications of AI",
  },
  ja: {
    llms: "AIとLLMの理解",
    systems: "AIシステムの仕組み",
    infra: "AIインフラとエンジニアリング",
    agents: "AIエージェントと自動化",
    applied: "AIの実世界での応用",
  },
} as const;
