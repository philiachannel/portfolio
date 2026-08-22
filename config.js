/* ============================================================
   config.js — サイト全体の定数を一元管理するファイル
   ここを編集するだけで全ページに反映されます
   ============================================================ */
const CONFIG = {

  /* ---- 基本情報 ---- */
  name:     'フィリアちゃんねる',
  nameEn:   'Philia Channel',
  bio:      'Python・VBA・GASを中心に業務効率化・自動化ツールの開発を行うフリーランスエンジニアです。ExcelやGoogleスプレッドシートの自動化、定型業務のスクリプト化、データ集計・レポート作成の自動化など幅広く対応しています。中小企業の業務改善に寄り添ったご提案が得意です。お気軽にご相談ください。',
  email:    'philiachannel@gmail.com',
  copyYear: '2026',

  /* ---- SNS・リンク（GitHubユーザー名を一箇所で管理） ---- */
  githubUser: 'philiachannel',
  zennUser:   '（ユーザー名）',
  xUser:      'Philia_ch',

  /* ---- クラウドソーシング ---- */
  crowdworksId: '5151248',
  coconalaId:   '3578031',

  /* ---- 事業内容画像 ---- */
  /* src: 画像パス、alt: 説明文 */
  services: [
    { src: 'images/service/service1.png', alt: 'システム開発' },
    { src: 'images/service/service2.png', alt: '業務効率化' },
    { src: 'images/service/service3.png', alt: 'プログラミング講習' },
    /* 画像を追加する場合はここに */
  ],

  /* ---- キャラクターアニメーション ---- */
  charAnim: {
    hairInterval:   180,   // 髪の画像切替間隔（ミリ秒）※小さいほど速い
    blinkInterval:  5000,  // 瞬きの間隔（ミリ秒）
    blinkDuration:  250,   // 目を閉じている時間（ミリ秒）
  },

  /* ---- ヒーロー背景の初期透明度（0〜1） ---- */
  heroOverlay: 0.55,

  /* ---- ナビゲーションメニュー ---- */
  navItems: [
    { label: 'プロフィール', href: '#profile'   },
    { label: '事業内容',   href: '#service'   },
    { label: 'スキル',       href: '#skill'     },
    { label: '特技・趣味',   href: '#strengths' },
    { label: 'ヒストリー',   href: '#history'   },
    { label: '作品',         href: '#works'     },
    { label: '連絡先',       href: '#contact'   },
  ],

  /* ---- スキル ---- */
  skills: {
    languages: [
      { name: 'Python',     years: 9, level: 5 },
      { name: 'VBA',        years: 5, level: 4 },
      { name: 'GAS',        years: 2, level: 3 },
      { name: 'C/C++',      years: 5, level: 3 },
      { name: 'JavaScript', years: 3, level: 2 },
      { name: 'HTML / CSS', years: 3, level: 2 },
      { name: 'SQL',        years: 9, level: 4 },
    ],
    tools: [
      { name: 'Claude',     years: 1, level: 3 },
      { name: 'Gemini',     years: 1, level: 3 },
      { name: 'GPT',        years: 3, level: 3 },
      { name: 'VOICEVOX',   years: 5, level: 5 },
      { name: 'OpenVINO',   years: 3, level: 4 },
      { name: 'Ultralytics',years: 3, level: 4 },
      { name: 'Whisper',    years: 1, level: 3 },
    ],
    platforms: [
      { name: 'WindowsServer',    years: 9, level: 4 },
      { name: 'LINUX',            years: 5, level: 3 },
      { name: 'AWS',              years: 3, level: 2 },
      { name: 'Azure',            years: 3, level: 2 },
      { name: 'Google Workspace', years: 5, level: 3 },
      { name: 'Git / GitHub',     years: 5, level: 2 },
    ],
  },

  /* ---- 得意領域 ---- */
  strengths: [
    '業務フローの分析と自動化提案',
    '非エンジニア向けの分かりやすいツール設計',
    '既存Excel・スプレッドシートの改修・効率化',
    'マルチプラットフォーム・API連携のAIシステム開発',
  ],

  /* ---- 趣味・特技 ---- */
  hobbies: [
    'プログラミング',
    'イラスト制作',
    '回路設計',
    'DIY',
    '服飾リメイク',
    'アクセサリー制作',
    'ゴルフ',
    'スノーボード',
    'サーフィン',
    'ボウリング',
  ],

  /* ---- ヒストリー ---- */
  history: [
    {
      date:  '1999年',
      title: 'ハードウェア保守エンジニア',
      desc:  '大手メーカー等、複数企業でハードウェア保守に従事。<br>訪問対応でコミュニケーションスキルやハードウェアスキルを高める。',
    },
    {
      date:  '2012年',
      title: 'システム保守エンジニア',
      desc:  '大手企業で顧客向けインフラ・システム保守業務に従事。<br>リーダー・サーバー管理者を担当。<br>大規模インフラのサーバースキルや運用スキルを高める。',
    },
    {
      date:  '2017年',
      title: 'AIと出会う',
      desc:  '研修の一環でMicrosoft社の技術イベントに参加。<br>AIの現在と未来に底知れぬ興味を持ち始める。<br>独学でAIとpythonを学ぶ。',
    },
    {
      date:  '2021年',
      title: 'AIエンジニアの道を目指す',
      desc:  '退職し、職業訓練校に入校。<br>プログラミングを物理的な形として落とし込みができる、マイコンプログラムを学ぶ。',
    },
    {
      date:  '2022年',
      title: 'フリーランスエンジニアとして独立',
      desc:  'AI開発・業務自動化ツール開発の活動を開始。<br>クラウドソーシングや直接契約で活動中。',
    },
    /* ---- 履歴を追加する場合はここに ---- */
  ],

  /* ---- 作品データ ---- */
  /*
    badges : 複数バッジ配列  例: ['Python','GAS']
    media  : 画像・動画を混在可能な配列（順番通りにスライド表示）
             { type:'image',   src:'images/work1.png' }
             { type:'youtube', src:'動画ID'            }
    github : リポジトリ名だけ（例: 'work-report'）
  */
  works: [
    {
      badges:  ['Python'],
      title:   'AI秘書',
      date:    '2026年04月～2026年7月',
      media: [
        {type:'image', src:'images/work/ai_secretary/01.png'},
        {type:'image', src:'images/work/ai_secretary/02.png'},
        {type:'image', src:'images/work/ai_secretary/03.png'},
        {type:'image', src:'images/work/ai_secretary/04.png'},
        {type:'youtube', src:'3jOSJ2cEcbA'},
        {type:'youtube', src:'W2LQ7bQ9jbQ'},
      ],
      flow:    ['応答文生成', '音声生成', '音声解析', 'キャラクター同期', '読み上げ'],
      desc:    'AIに顔と声を与えるマスコットアプリです。\nAIと肩を並べて仕事をするようになり、ビジネスパートナーとも呼べる存在になりました。\n「一緒に仕事をするなら、もっと親近感のわく存在にしたい」が制作のきっかけです。\nClaudeやGeminiの応答文をリップシンクしながら読み上げます。',
      tags:    ['Python', 'Claude', 'Gemini', 'Live2DCubismSDK', 'VOICEVOX'],
      github:  'work-report',
    },
    {
      badges:  ['VBA'],
      title:   'Excel請求書一括作成マクロ',
      date:    '2025年02月',
      media: [
        { type: 'youtube', src: '*****' },
        { type: 'image',   src: 'images/work2.png' },
      ],
      flow:    ['顧客リスト読込', 'テンプレ複製', 'データ差込', 'PDF保存・出力'],
      desc:    '顧客マスタとテンプレートから請求書を一括生成するVBAマクロ。月30件の請求書作成が約3分で完了。ファイル名の自動命名・フォルダ振り分けも対応し、ヒューマンエラーをゼロにした。',
      tags:    ['VBA', 'Excel', 'PDF出力'],
      github:  'work-invoice',
    },
    {
      badges:  ['Python', 'GAS'],
      title:   'Googleフォーム自動集計システム',
      date:    '2024年12月',
      media: [
        { type: 'youtube', src: '動画ID1' },
        { type: 'youtube', src: '動画ID2' },
        { type: 'image',   src: 'images/work3.png' },
      ],
      flow:    ['フォーム回答受信', 'スプレッドシート集計', 'グラフ自動更新', 'Slack通知送信'],
      desc:    'アンケートフォームの回答を自動集計し、グラフ付きのサマリーをSlackへ通知するGASシステム。集計の手作業をゼロにし、リアルタイムで結果を共有できる体制を構築した。',
      tags:    ['GAS', 'Googleフォーム', 'スプレッドシート', 'Slack'],
      github:  'work-gas',
    },
    /* ---- 作品4以降はここに追加 ---- */
  ],
};
