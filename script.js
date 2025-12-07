// متجر الريان - الأثاث المنزلي
document.addEventListener('DOMContentLoaded', function() {
    // 1. إعداد رقم واتساب - قم بتغييره لرقمك الخاص
    const whatsappNumber = "249XXXXXXXXX"; // غير XXXXXXXXX برقم واتسابك
    const defaultMessage = "مرحباً، أريد الاستفسار عن المنتج";
    
    // 2. تفعيل أزرار الاستفسار
    const inquiryButtons = document.querySelectorAll('.inquiry-btn');
    
    inquiryButtons.forEach(button => {
        button.addEventListener('click', function() {
            const productName = this.getAttribute('data-product');
            const message = `${defaultMessage}: ${productName}`;
            const encodedMessage = encodeURIComponent(message);
            const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
            
            window.open(whatsappURL, '_blank');
        });
    });
    
    // 3. تحديث جميع روابط واتساب بالرقم الصحيح
    function updateWhatsappLinks() {
        // تحديث زر واتساب الثابت
        const fixedWhatsappBtn = document.querySelector('.whatsapp-btn');
        if (fixedWhatsappBtn) {
            const message = encodeURIComponent(defaultMessage);
            fixedWhatsappBtn.href = `https://wa.me/${whatsappNumber}?text=${message}`;
        }
        
        // تحديث زر واتساب في قسم الاتصال
        const contactWhatsappBtn = document.querySelector('.contact-btn');
        if (contactWhatsappBtn) {
            const message = encodeURIComponent("مرحباً، أريد التواصل مع متجر الريان");
            contactWhatsappBtn.href = `https://wa.me/${whatsappNumber}?text=${message}`;
        }
    }
    
    // 4. التمرير السلس للروابط الداخلية
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
                
                // إغلاق القائمة المتنقلة على الجوال (إذا كانت موجودة)
                if (window.innerWidth <= 768) {
                    const nav = document.querySelector('.nav');
                    if (nav.classList.contains('active')) {
                        nav.classList.remove('active');
                    }
                }
            }
        });
    });
    
    // 5. تأثير التمرير على الهيدر
    window.addEventListener('scroll', function() {
        const header = document.querySelector('.header');
        if (window.scrollY > 100) {
            header.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.1)';
            header.style.padding = '10px 0';
        } else {
            header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
            header.style.padding = '15px 0';
        }
    });
    
    // 6. إضافة تأثيرات للبطاقات عند التمرير
    function animateOnScroll() {
        const cards = document.querySelectorAll('.product-card, .category-card');
        
        cards.forEach(card => {
            const cardPosition = card.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.2;
            
            if (cardPosition < screenPosition) {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }
        });
    }
    
    // تهيئة تأثيرات البطاقات
    document.querySelectorAll('.product-card, .category-card').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });
    
    window.addEventListener('scroll', animateOnScroll);
    // تشغيل مرة أولية
    animateOnScroll();
    
    // 7. تحديث روابط واتساب عند تحميل الصفحة
    updateWhatsappLinks();
    
    // 8. إضافة رسالة ترحيب في الكونسول
    console.log('🚀 متجر الريان للأثاث المنزلي جاهز للتشغيل');
    console.log('📱 رقم واتساب الحالي: ' + whatsappNumber);
    console.log('✨ يمكنك تغيير رقم واتساب في المتغير whatsappNumber');
    
    // 9. التحقق من الصور المفقودة
    document.querySelectorAll('img').forEach(img => {
        img.onerror = function() {
            console.warn('⚠️ الصورة غير موجودة: ' + this.alt);
            this.src = 'https://via.placeholder.com/300x200/cccccc/666666?text=' + encodeURIComponent(this.alt);
        };
    });
});

// 10. إضافة رسالة عند محاولة مغادرة الصفحة
window.addEventListener('beforeunload', function(e) {
    // يمكن تفعيل هذه الميزة لاحقاً إذا أردت
    // e.preventDefault();
    // e.returnValue = '';
});

// 11. تعيين تاريخ حقوق النشر الحالي
const currentYear = new Date().getFullYear();
const copyrightElement = document.querySelector('.copyright');
if (copyrightElement) {
    copyrightElement.textContent = `© ${currentYear} متجر الريان. جميع الحقوق محفوظة.`;
}