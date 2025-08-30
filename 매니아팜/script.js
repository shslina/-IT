// DOM이 로드된 후 실행
document.addEventListener('DOMContentLoaded', function() {
    
    // 검색 기능
    const searchInput = document.querySelector('.search-box input');
    const searchBtn = document.querySelector('.search-btn');
    const filterSelects = document.querySelectorAll('.filter-select');
    const suggestionTags = document.querySelectorAll('.suggestion-tag');
    
    // 검색 버튼 클릭 이벤트
    searchBtn.addEventListener('click', function() {
        performSearch(searchInput.value);
    });
    
    // Enter 키 입력 이벤트
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            performSearch(searchInput.value);
        }
    });
    
    // 추천검색어 클릭 이벤트
    suggestionTags.forEach(tag => {
        tag.addEventListener('click', function() {
            const searchText = this.getAttribute('data-search');
            searchInput.value = searchText;
            performSearch(searchText);
            
            // 클릭 효과
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
        });
    });
    
    // 필터 변경 이벤트
    filterSelects.forEach(select => {
        select.addEventListener('change', function() {
            const filterType = this.previousElementSibling.textContent;
            const filterValue = this.value;
            
            if (filterValue) {
                console.log(`${filterType}: ${filterValue} 필터 적용`);
                showNotification(`${filterType} 필터가 적용되었습니다.`);
            }
        });
    });
    
    // 검색 실행 함수
    function performSearch(query) {
        if (query.trim() === '') {
            alert('검색어를 입력해주세요.');
            return;
        }
        
        // 실제 검색 기능 구현 시에는 서버로 요청을 보내야 함
        console.log('검색어:', query);
        
        // 검색 결과 표시 (현재는 단순히 콘솔에 출력)
        showSearchResults(query);
    }
    
    // 검색 결과 표시 함수
    function showSearchResults(query) {
        const productsSection = document.querySelector('.products-section');
        const sectionHeader = productsSection.querySelector('.section-header p');
        const resultCount = productsSection.querySelector('.result-number');
        
        // 검색어에 맞게 헤더 업데이트
        sectionHeader.textContent = `"${query}"에 대한 검색 결과입니다.`;
        
        // 검색창의 값도 업데이트
        const searchInput = document.querySelector('.search-box input');
        if (searchInput) {
            searchInput.value = query;
        }
        
        // 검색 결과 수 업데이트 (현재는 1건으로 고정)
        resultCount.textContent = '1';
        
        // 검색 결과가 있을 때 애니메이션 효과
        productsSection.style.opacity = '0';
        productsSection.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            productsSection.style.transition = 'all 0.5s ease';
            productsSection.style.opacity = '1';
            productsSection.style.transform = 'translateY(0)';
        }, 100);
        
        // 상품 하이라이트 애니메이션
        const highlight = productsSection.querySelector('.product-highlight');
        if (highlight) {
            highlight.style.opacity = '0';
            highlight.style.transform = 'scale(0.8)';
            
            setTimeout(() => {
                highlight.style.transition = 'all 0.6s ease';
                highlight.style.opacity = '1';
                highlight.style.transform = 'scale(1)';
            }, 300);
        }
    }
    
    // 좋아요 버튼 기능
    const heartBtn = document.querySelector('.btn-heart');
    let isLiked = false;
    
    heartBtn.addEventListener('click', function() {
        isLiked = !isLiked;
        
        if (isLiked) {
            this.innerHTML = '<i class="fas fa-heart"></i>';
            this.style.color = '#ff4757';
            this.style.borderColor = '#ff4757';
            
            // 좋아요 애니메이션
            this.style.transform = 'scale(1.2)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 200);
            
            showNotification('상품을 찜했습니다!');
        } else {
            this.innerHTML = '<i class="far fa-heart"></i>';
            this.style.color = '#666';
            this.style.borderColor = '#ddd';
            showNotification('찜을 취소했습니다.');
        }
    });
    
    // 채팅하기 버튼 기능
    const chatBtn = document.querySelector('.btn-chat');
    
    chatBtn.addEventListener('click', function() {
        showNotification('채팅 기능은 준비 중입니다.');
        
        // 버튼 클릭 효과
        this.style.transform = 'scale(0.95)';
        setTimeout(() => {
            this.style.transform = 'scale(1)';
        }, 150);
    });
    
    // 로그아웃 버튼 기능
    const logoutBtn = document.querySelector('.btn-logout');
    
    logoutBtn.addEventListener('click', function() {
        if (confirm('정말 로그아웃 하시겠습니까?')) {
            showNotification('로그아웃되었습니다.');
            // 실제 구현 시에는 세션/토큰 제거 로직 추가
        }
    });
    
    // 알림 메시지 표시 함수
    function showNotification(message) {
        // 기존 알림이 있다면 제거
        const existingNotification = document.querySelector('.notification');
        if (existingNotification) {
            existingNotification.remove();
        }
        
        // 새 알림 생성
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.textContent = message;
        
        // 스타일 적용
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: #0066cc;
            color: white;
            padding: 15px 20px;
            border-radius: 8px;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
            z-index: 10000;
            font-weight: 500;
            transform: translateX(100%);
            transition: transform 0.3s ease;
        `;
        
        document.body.appendChild(notification);
        
        // 애니메이션 효과
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        // 3초 후 자동 제거
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                notification.remove();
            }, 300);
        }, 3000);
    }
    
    // 스크롤 시 헤더 스타일 변경
    window.addEventListener('scroll', function() {
        const header = document.querySelector('.header');
        
        if (window.scrollY > 100) {
            header.style.background = 'rgba(255, 255, 255, 0.95)';
            header.style.backdropFilter = 'blur(10px)';
        } else {
            header.style.background = '#fff';
            header.style.backdropFilter = 'none';
        }
    });
    
    // 상품 카드 호버 효과 개선
    const productCards = document.querySelectorAll('.product-card');
    
    productCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // 페이지 로드 시 애니메이션
    setTimeout(() => {
        document.body.style.opacity = '0';
        document.body.style.transition = 'opacity 0.5s ease';
        
        setTimeout(() => {
            document.body.style.opacity = '1';
        }, 100);
    }, 100);
    
    // 검색창 포커스 효과
    searchInput.addEventListener('focus', function() {
        this.parentElement.style.boxShadow = '0 6px 25px rgba(0, 102, 204, 0.2)';
        this.parentElement.style.transform = 'scale(1.02)';
    });
    
    searchInput.addEventListener('blur', function() {
        this.parentElement.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
        this.parentElement.style.transform = 'scale(1)';
    });
    
    // 로딩 상태 표시 (실제 API 호출 시 사용)
    function showLoading() {
        const loading = document.createElement('div');
        loading.className = 'loading';
        loading.innerHTML = '<i class="fas fa-spinner fa-spin"></i> 검색 중...';
        
        loading.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: rgba(0, 0, 0, 0.8);
            color: white;
            padding: 20px 30px;
            border-radius: 10px;
            z-index: 10000;
            font-size: 16px;
        `;
        
        document.body.appendChild(loading);
        
        return loading;
    }
    
    function hideLoading(loadingElement) {
        if (loadingElement) {
            loadingElement.remove();
        }
    }
    
    // 키보드 단축키
    document.addEventListener('keydown', function(e) {
        // Ctrl + K 또는 Cmd + K로 검색창 포커스
        if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
            e.preventDefault();
            searchInput.focus();
        }
        
        // ESC 키로 검색창 포커스 해제
        if (e.key === 'Escape') {
            searchInput.blur();
        }
    });
    
    // 푸터 링크 클릭 이벤트
    const footerLinks = document.querySelectorAll('.footer-section a');
    
    footerLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const linkText = this.textContent;
            showNotification(`${linkText} 페이지는 준비 중입니다.`);
        });
    });
    
    // 소셜 미디어 링크 클릭 이벤트
    const socialLinks = document.querySelectorAll('.social-links a');
    
    socialLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const platform = this.querySelector('i').className.includes('facebook') ? 'Facebook' :
                           this.querySelector('i').className.includes('twitter') ? 'Twitter' :
                           this.querySelector('i').className.includes('instagram') ? 'Instagram' :
                           this.querySelector('i').className.includes('youtube') ? 'YouTube' : '소셜미디어';
            
            showNotification(`${platform} 링크는 준비 중입니다.`);
        });
    });
    
    console.log('매니아팜:IT갤 웹사이트가 성공적으로 로드되었습니다!');
}); 