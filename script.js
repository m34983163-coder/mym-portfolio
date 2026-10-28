// 1. Mobile menu: open/close with the hamburger, close when a link is tapped
const burger = document.getElementById('burger');
const menu = document.getElementById('menu');
function setMenu(open) {
  menu.classList.toggle('open', open);
  burger.setAttribute('aria-expanded', open);
  const isAr = document.documentElement.lang === 'ar';
  burger.setAttribute('aria-label', open ? (isAr ? 'أغلق القائمة' : 'Close menu') : (isAr ? 'افتح القائمة' : 'Open menu'));
}
burger.addEventListener('click', () => setMenu(!menu.classList.contains('open')));
menu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => setMenu(false)));
document.addEventListener('keydown', e => { if (e.key === 'Escape') setMenu(false); });

// 2. Profile image fallback: if the photo fails to load, show the MYM placeholder
const img = document.getElementById('profileImg');
img.addEventListener('error', () => { img.style.display = 'none'; });

// 3. Sections fade in when scrolled into view
const reveals = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window) {
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('show'); io.unobserve(e.target); } });
  }, { threshold: 0.12 });
  reveals.forEach(r => io.observe(r));
} else { reveals.forEach(r => r.classList.add('show')); }

// 4. Back-to-top button
const toTop = document.getElementById('toTop');
window.addEventListener('scroll', () => toTop.classList.toggle('visible', window.scrollY > 600), { passive: true });
toTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

// 5. Mouse glow (desktop only, skipped if reduced motion)
const glow = document.querySelector('.mouse-glow');
const canHover = matchMedia('(hover: hover) and (pointer: fine)').matches;
const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
if (canHover && !reduce) {
  window.addEventListener('mousemove', e => {
    glow.style.opacity = 1;
    glow.style.transform = `translate(${e.clientX - 200}px, ${e.clientY - 200}px)`;
  }, { passive: true });
}

// 6. Language switch (English / Arabic)
// Add more translations by adding a line: "English text": "Arabic text"
const AR = {
  "Home":"الرئيسية","About Me":"من أنا","Skills":"المهارات","Portfolio":"الأعمال","Contact":"تواصل",
  "AVAILABLE FOR WORK":"متاح للعمل","Hi, I'm":"أهلاً، أنا","Mohammed Yasser Mohammed":"محمد ياسر محمد",
  "Software Engineer & Image Designer":"مهندس برمجيات ومصمم صور",
  "I build clean software and design creative visuals. I love turning ideas into modern digital experiences that look good and work well.":"أبني برمجيات نظيفة وأصمم صورًا إبداعية. أحب تحويل الأفكار إلى تجارب رقمية حديثة بشكل جميل وتعمل بكفاءة.",
  "Let's Work Together":"لنعمل معًا","Explore My Portfolio":"استكشف أعمالي",
  "About":"نبذة","Me":"عني",
  "I'm Mohammed Yasser Mohammed, a software engineering enthusiast and image designer from Suez, Egypt. I enjoy combining technology and creativity to build modern digital experiences and create visually appealing designs. I'm always looking to improve my skills, explore new technologies, and collaborate on exciting projects.":"أنا محمد ياسر محمد، شغوف بهندسة البرمجيات ومصمم صور من السويس، مصر. أستمتع بالجمع بين التكنولوجيا والإبداع لبناء تجارب رقمية حديثة وتصميمات جذابة. أسعى دائمًا لتطوير مهاراتي واستكشاف تقنيات جديدة والتعاون في مشاريع مميزة.",
  "Full Name":"الاسم الكامل","Profession":"المهنة","Location":"الموقع","Suez, Egypt":"السويس، مصر",
  "Marital Status":"الحالة الاجتماعية","Single":"أعزب",
  "Skills &":"المهارات و","Services":"الخدمات",
  "Areas I work in and enjoy learning more about.":"المجالات التي أعمل فيها وأحب أن أتعلم المزيد عنها.",
  "Software Development":"تطوير البرمجيات","Frontend Development":"تطوير الواجهات الأمامية","Web Design":"تصميم المواقع",
  "UI/UX Design":"تصميم واجهات وتجربة المستخدم","Image Editing":"تعديل الصور","Graphic Design":"التصميم الجرافيكي",
  "Responsive Web Design":"تصميم مواقع متجاوبة","Creative Problem Solving":"حل المشكلات بإبداع",
  "My":"معرض","Example project cards. Replace them with your real work.":"بطاقات مشاريع كأمثلة. استبدلها بأعمالك الحقيقية.",
  "Web Development":"تطوير الويب","Web Development Projects":"مشاريع تطوير الويب","Websites and web apps built with clean, simple code.":"مواقع وتطبيقات ويب مبنية بكود نظيف وبسيط.",
  "Image Design":"تصميم الصور","Creative Image Designs":"تصميمات صور إبداعية","Photo edits and visual designs with a creative style.":"تعديلات صور وتصميمات بصرية بأسلوب إبداعي.",
  "Personal Website Designs":"تصميمات مواقع شخصية","Modern personal sites that show people's work clearly.":"مواقع شخصية حديثة تعرض أعمال أصحابها بوضوح.",
  "Branding":"الهوية البصرية","Digital Branding Concepts":"أفكار هوية رقمية","Logo and brand identity ideas for digital projects.":"أفكار شعارات وهوية بصرية للمشاريع الرقمية.",
  "View project":"عرض المشروع","Have a":"عندك","Project in Mind?":"مشروع في بالك؟",
  "Let's turn your ideas into something amazing. Contact me to discuss your next project or collaboration.":"خلينا نحوّل أفكارك لشيء رائع. تواصل معي لنناقش مشروعك القادم أو تعاوننا.",
  "WhatsApp Contact":"تواصل عبر واتساب","Business Inquiries":"استفسارات العمل","Facebook":"فيسبوك","Visit my profile":"زيارة صفحتي",
  "© 2026 Mohammed Yasser Mohammed. All Rights Reserved.":"© 2026 محمد ياسر محمد. جميع الحقوق محفوظة."
};
const AR_ATTR = { "Portrait of Mohammed Yasser Mohammed":"صورة محمد ياسر محمد",
  "Laptop and code windows on a dark blue stage":"لابتوب ونوافذ كود على خلفية زرقاء داكنة",
  "Purple glass sphere and flowing glass ribbons":"كرة زجاجية بنفسجية وأشرطة زجاجية متدفقة",
  "Website layout on desktop and phone":"تصميم موقع على الكمبيوتر والهاتف",
  "Glowing blue and purple logo on a podium":"شعار متوهج أزرق وبنفسجي على منصة" };
const MENU_LABELS = { "Open menu":"افتح القائمة","Close menu":"أغلق القائمة" };

// Remember original English text so we can switch back
const textNodes = [];
const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
while (walker.nextNode()) {
  const n = walker.currentNode;
  if (n.parentElement.closest('script') || !n.nodeValue.trim()) continue;
  textNodes.push({ node: n, en: n.nodeValue });
}
const altImgs = [...document.querySelectorAll('img[alt]')].map(i => ({ el: i, en: i.alt }));
const langBtn = document.getElementById('lang');

function setLang(lang) {
  const ar = lang === 'ar';
  document.documentElement.lang = lang;
  document.documentElement.dir = ar ? 'rtl' : 'ltr';
  textNodes.forEach(t => {
    const key = t.en.trim();
    t.node.nodeValue = ar && AR[key] ? t.en.replace(key, AR[key]) : t.en;
  });
  altImgs.forEach(a => { a.el.alt = ar && AR_ATTR[a.en] ? AR_ATTR[a.en] : a.en; });
  document.title = ar ? 'محمد ياسر محمد | مهندس برمجيات ومصمم صور' : 'Mohammed Yasser Mohammed | Software Engineer & Image Designer';
  langBtn.textContent = ar ? 'English' : 'العربية';
  langBtn.setAttribute('aria-label', ar ? 'التبديل إلى الإنجليزية' : 'Switch language to Arabic');
  burger.setAttribute('aria-label', menu.classList.contains('open') ? (ar ? 'أغلق القائمة' : 'Close menu') : (ar ? 'افتح القائمة' : 'Open menu'));
  try { localStorage.setItem('lang', lang); } catch (e) {}
}
langBtn.addEventListener('click', () => setLang(document.documentElement.lang === 'ar' ? 'en' : 'ar'));
let saved = null; try { saved = localStorage.getItem('lang'); } catch (e) {}
if (saved === 'ar') setLang('ar');
