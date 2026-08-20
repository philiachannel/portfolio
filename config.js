/* ============================================================
   config.js — サイト全体の定数を一元管理するファイル
   ここを編集するだけで全ページに反映されます
   ============================================================ */
const CONFIG = {

  /* ---- 基本情報 ---- */
  name:     'フィリアちゃんねる',
  nameEn:   'Philia Channel',
  bio:      'Python・VBA・GASを中心に業務効率化・自動化ツールの開発を行うフリーランスエンジニアです。ExcelやGoogleスプレッドシートの自動化、定型業務のスクリプト化、データ集計・レポート作成の自動化など幅広く対応しています。中小企業の業務改善に寄り添ったご提案が得意です。お気軽にご相談ください。',
  email:    'your-email@example.com',
  copyYear: '2026',

  /* ---- SNS・リンク（GitHubユーザー名を一箇所で管理） ---- */
  githubUser: 'philiachannel',
  zennUser:   '（ユーザー名）',
  xUser:      'Philia_ch',

  /* ---- クラウドソーシング ---- */
  crowdworksId: '5151248',
  coconalaId:   '3578031',

  /* ---- 作品リポジトリのベースURL（githubUserから自動生成） ---- */
  /* 各作品の github フィールドはリポジトリ名だけでOK                */
  /* 例: github: 'work-report'  →  https://github.com/philiachannel/work-report */

  /* ---- ヒーロー背景の初期透明度（0〜1） ---- */
  heroOverlay: 0.55,

  /* ---- ナビゲーションメニュー ---- */
  navItems: [
    { label: 'プロフィール', href: '#profile'   },
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
      { name: 'VBA',        years: 5, level: 5 },
      { name: 'GAS',        years: 2, level: 4 },
      { name: 'JavaScript', years: 3, level: 3 },
      { name: 'HTML / CSS', years: 3, level: 3 },
    ],
    tools: [
      { name: 'Excel',            years: 20, level: 5 },
      { name: 'Google Workspace', years: 5,  level: 4 },
      { name: 'VS Code',          years: 3,  level: 4 },
      { name: 'Git / GitHub',     years: 2,  level: 3 },
    ],
    platforms: [
      { name: 'Windows',       years: 15, level: 5 },
      { name: 'GitHub Pages',  years: 1,  level: 3 },
      { name: 'クラウドワークス', years: 2, level: 4 },
      { name: 'ココナラ',       years: 1,  level: 3 },
    ],
  },

  /* ---- 特技 ---- */
  strengths: [
    '業務フローの分析と自動化提案',
    '非エンジニア向けの分かりやすいツール設計',
    '既存Excelシートの改修・高速化',
    'ドキュメント・マニュアル作成',
  ],

  /* ---- 趣味 ---- */
  hobbies: [
    'プログラミング',
    'カナダ旅行・英語学習',
    'Webデザイン',
    'YouTube動画制作',
    '読書（技術書・ビジネス書）',
  ],

  /* ---- ヒストリー ---- */
  history: [
    {
      date:  '2007年02月',
      title: 'カナダでワーキングホリデー',
      desc:  'ワーホリビザで渡加。アクセサリーショップ等でバイト。カナダ生活を満喫。',
    },
    {
      date:  '2008年03月',
      title: 'Webの専門学校に入学',
      desc:  '有給インターンシップ付きの一年プログラムを受講。HTML、CSS、JavaScript、PHP等のコーディングやWebデザインの基礎を学ぶ。',
    },
    {
      date:  '2009年02月',
      title: 'バンクーバーのWeb制作会社でWebデザイナーとして働く',
      desc:  '私以外全員カナダ人という環境で英語やWebの技術を学びながら必死に働く。',
    },
    {
      date:  '2010年04月',
      title: '帰国・フリーランスエンジニアとして独立',
      desc:  '日本に帰国後、フリーランスとしてWeb制作・業務自動化ツール開発を開始。',
    },
    /* ---- 履歴を追加する場合はここに ---- */
  ],

  /* ---- 作品データ ---- */
  /* images: 複数画像をモーダルでスライド表示 ['images/a.png','images/b.png']  */
  /* youtube: 動画IDを入れると優先表示。画像と排他            */
  /* github: リポジトリ名だけ（例: 'work-report'）            */
  works: [
    {
      badge:   'Python',
      title:   '月次レポート自動化ツール',
      date:    '2025年04月',
      images:  ['images/work1.png'],
      youtube: '',
      flow:    ['Excelデータ読込', 'データ集計・加工', 'PDFレポート生成', 'メール自動送信'],
      desc:    '毎月手作業で行っていたExcelデータの集計・PDF化・メール送信をPythonで完全自動化。作業時間を月5時間→15分に短縮。定型フォーマットへの対応、複数部署への自動配信も実現した。',
      tags:    ['Python', 'openpyxl', 'reportlab', 'smtplib'],
      github:  'work-report',
    },
    {
      badge:   'VBA',
      title:   'Excel請求書一括作成マクロ',
      date:    '2025年02月',
      images:  [],
      youtube: '*****',
      flow:    ['顧客リスト読込', 'テンプレ複製', 'データ差込', 'PDF保存・出力'],
      desc:    '顧客マスタとテンプレートから請求書を一括生成するVBAマクロ。月30件の請求書作成が約3分で完了。ファイル名の自動命名・フォルダ振り分けも対応し、ヒューマンエラーをゼロにした。',
      tags:    ['VBA', 'Excel', 'PDF出力'],
      github:  'work-invoice',
    },
    {
      badge:   'GAS',
      title:   'Googleフォーム自動集計システム',
      date:    '2024年12月',
      images:  [],
      youtube: '',
      flow:    ['フォーム回答受信', 'スプレッドシート集計', 'グラフ自動更新', 'Slack通知送信'],
      desc:    'アンケートフォームの回答を自動集計し、グラフ付きのサマリーをSlackへ通知するGASシステム。集計の手作業をゼロにし、リアルタイムで結果を共有できる体制を構築した。',
      tags:    ['GAS', 'Googleフォーム', 'スプレッドシート', 'Slack'],
      github:  'work-gas',
    },
    /* ---- 作品4以降はここに追加 ---- */
  ],
};
