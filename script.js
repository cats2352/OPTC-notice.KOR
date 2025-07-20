// 이 스크립트는 DOM(문서 객체 모델)이 완전히 로드된 후에 실행됩니다.
document.addEventListener('DOMContentLoaded', function() {

    // 전역 변수로 현재 페이지와 페이지당 게시물 수를 관리합니다
    let currentPage = 1;
    const itemsPerPage = 5; // 페이지당 5개 게시물
    
    // 정렬 관련 전역 변수
    let currentSortDirection = 'desc'; // 기본 정렬 방향 (내림차순)

    /**
     * 뷰 모드 설정을 관리하는 함수
     */
    function setupViewMode() {
        const viewModeToggle = document.getElementById('viewModeToggle');
        
        // 저장된 뷰 모드 설정 불러오기
        const savedView = localStorage.getItem('viewMode') || 'pc';
        document.documentElement.setAttribute('data-view', savedView);
        
        // 뷰 모드 토글 버튼 클릭 이벤트
        viewModeToggle.addEventListener('click', () => {
            const currentView = document.documentElement.getAttribute('data-view');
            const newView = currentView === 'mobile' ? 'pc' : 'mobile';
            
            // 뷰 모드 변경 및 저장
            document.documentElement.setAttribute('data-view', newView);
            localStorage.setItem('viewMode', newView);
        });
    }

    /**
     * 다크모드 설정을 관리하는 함수
     */
    function setupDarkMode() {
        const darkModeToggle = document.getElementById('darkModeToggle');
        
        // 저장된 테마 설정 불러오기
        const savedTheme = localStorage.getItem('theme') || 'light';
        document.documentElement.setAttribute('data-theme', savedTheme);
        
        // 다크모드 토글 버튼 클릭 이벤트
        darkModeToggle.addEventListener('click', () => {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            
            // 테마 변경 및 저장
            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
        });
    }

    /**
     * 게시물을 작성일 기준으로 정렬하고 번호를 자동으로 매기는 함수
     */
    function sortAndNumberPosts(sortDirection = 'desc') {
        const tableBody = document.querySelector('.notice-table tbody');
        const allDataRows = Array.from(tableBody.querySelectorAll('tr:not(.no-results-row)'));
        
        // 작성일 기준으로 게시물을 정렬
        allDataRows.sort((a, b) => {
            const dateA = new Date(a.getAttribute('data-date'));
            const dateB = new Date(b.getAttribute('data-date'));
            const comparison = dateA - dateB;
            
            // 정렬 방향에 따라 반환값 조정
            return sortDirection === 'asc' ? comparison : -comparison;
        });
        
        // 정렬된 순서대로 DOM에서 위치를 변경
        allDataRows.forEach(row => {
            tableBody.appendChild(row);
        });
        
        // 번호를 자동으로 매기기 (1번부터 시작)
        allDataRows.forEach((row, index) => {
            const numberCell = row.querySelector('td:first-child');
            if (numberCell) {
                numberCell.textContent = index + 1;
            }
        });
        
        // 정렬 상태 업데이트
        updateSortIcons(sortDirection);
    }
    
    /**
     * 정렬 아이콘을 업데이트하는 함수
     */
    function updateSortIcons(sortDirection) {
        // 작성일 헤더에서 정렬 상태 제거
        const dateHeader = document.querySelector('.notice-table th[data-sort="date"]');
        if (dateHeader) {
            dateHeader.removeAttribute('data-sort-direction');
            dateHeader.setAttribute('data-sort-direction', sortDirection);
        }
    }

    /**
     * 7일 이내 게시물에 최신글 배지를 표시하는 함수
     */
    function setupNewBadge() {
        const tableBody = document.querySelector('.notice-table tbody');
        const allDataRows = tableBody.querySelectorAll('tr:not(.no-results-row)');
        
        // 현재 날짜를 가져옵니다
        const currentDate = new Date();
        
        allDataRows.forEach(row => {
            // data-date 속성에서 날짜를 가져옵니다
            const dateAttribute = row.getAttribute('data-date');
            if (dateAttribute) {
                const postDate = new Date(dateAttribute);
                
                // 현재 날짜와 게시물 날짜의 차이를 계산합니다 (밀리초 단위)
                const timeDifference = currentDate.getTime() - postDate.getTime();
                const daysDifference = timeDifference / (1000 * 3600 * 24); // 일 단위로 변환
                
                // 3일 이내인 경우 최신글 배지를 추가합니다
                if (daysDifference <= 3 && daysDifference >= 0) {
                    const titleCell = row.querySelector('td:nth-child(2)');
                    if (titleCell) {
                        const link = titleCell.querySelector('a');
                        if (link) {
                            // 최신글 배지 생성
                            const newBadge = document.createElement('span');
                            newBadge.className = 'new-badge';
                            newBadge.textContent = 'NEW';
                            
                            // 링크 앞에 배지를 추가합니다 (제목 좌측)
                            link.insertBefore(newBadge, link.firstChild);
                        }
                    }
                }
            }
        });
    }

    /**
     * 페이지네이션을 설정하는 함수
     */
    function setupPagination() {
        const tableBody = document.querySelector('.notice-table tbody');
        const allDataRows = tableBody.querySelectorAll('tr:not(.no-results-row)');
        const paginationContainer = document.querySelector('.pagination');
        
        // 전체 게시물 수 계산
        const totalItems = allDataRows.length;
        const totalPages = Math.ceil(totalItems / itemsPerPage);
        
        // 페이지네이션 HTML 생성
        function createPaginationHTML() {
            let paginationHTML = '';
            
            // 이전 페이지 버튼
            if (currentPage > 1) {
                paginationHTML += `<a href="#" class="page-link" data-page="${currentPage - 1}">이전</a>`;
            }
            
            // 페이지 번호들
            for (let i = 1; i <= totalPages; i++) {
                const isActive = i === currentPage ? 'active' : '';
                paginationHTML += `<a href="#" class="page-link ${isActive}" data-page="${i}">${i}</a>`;
            }
            
            // 다음 페이지 버튼
            if (currentPage < totalPages) {
                paginationHTML += `<a href="#" class="page-link" data-page="${currentPage + 1}">다음</a>`;
            }
            
            return paginationHTML;
        }
        
        // 페이지네이션 HTML 업데이트
        paginationContainer.innerHTML = createPaginationHTML();
        
        // 페이지네이션 클릭 이벤트 설정
        paginationContainer.addEventListener('click', function(e) {
            e.preventDefault();
            
            if (e.target.classList.contains('page-link')) {
                const targetPage = parseInt(e.target.getAttribute('data-page'));
                if (targetPage && targetPage !== currentPage) {
                    currentPage = targetPage;
                    showCurrentPage();
                    setupPagination(); // 페이지네이션 다시 렌더링
                }
            }
        });
    }
    
    /**
     * 현재 페이지의 게시물만 표시하는 함수
     */
    function showCurrentPage() {
        const tableBody = document.querySelector('.notice-table tbody');
        const allDataRows = tableBody.querySelectorAll('tr:not(.no-results-row)');
        
        // 시작과 끝 인덱스 계산
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        
        // 모든 게시물을 숨기고 현재 페이지의 게시물만 표시
        allDataRows.forEach((row, index) => {
            if (index >= startIndex && index < endIndex) {
                row.style.display = '';
            } else {
                row.style.display = 'none';
            }
        });
    }

    /**
     * 공지사항 링크 클릭 이벤트를 설정하는 함수
     */
    function setupNoticeLinks() {
        const tableBody = document.querySelector('.notice-table tbody');
        const allDataRows = tableBody.querySelectorAll('tr:not(.no-results-row)');
        
        allDataRows.forEach(row => {
            const titleCell = row.querySelector('td:nth-child(2)');
            if (titleCell) {
                const link = titleCell.querySelector('a');
                if (link) {
                    // 링크 클릭 이벤트 설정
                    link.addEventListener('click', function(e) {
                        e.preventDefault();
                        
                        // 제목을 기반으로 공지사항 ID 결정
                        const title = link.textContent.trim();
                        let noticeId = '';
                        
                        if (title.includes('공지사항 업데이트')) {
                            noticeId = 'server-maintenance';
                        } else if (title.includes('신규 캐릭터 추가완료')) {
                            noticeId = 'security-patch';
                        }  else if (title.includes('뉴비들이 자주물어보는 질문 사이트 런칭')) {
                            noticeId = 'security-patch2';
                        }   else if (title.includes('[기능추가]바로가기버튼 추가 및 태그기능추가')) {
                            noticeId = 'security-patch3';
                        }   else if (title.includes('[업데이트 완료]7/19일 신규캐릭터추가')) {
                            noticeId = 'security-patch4';
                        }   else if (title.includes('일부 캐릭터 초월 필살기 미표시 오류수정')) {
                            noticeId = 'security-patch5';
                        }   else if (title.includes('[번역완료]캐릭터 획득 경로 태그 번역')) {
                            noticeId = 'security-patch6';
                        }
                        else {
                            // 기본 공지사항 (내용이 없는 경우)
                            noticeId = 'default';
                        }
                        
                        // 상세 페이지로 이동
                        window.location.href = `content/notice-detail.html?id=${noticeId}`;
                    });
                }
            }
        });
    }

    /**
     * 테이블 헤더 정렬 기능을 설정하는 함수
     */
    function setupSortingFunctionality() {
        const dateHeader = document.querySelector('.notice-table th[data-sort="date"]');
        
        if (dateHeader) {
            dateHeader.addEventListener('click', function() {
                // 정렬 방향을 토글
                currentSortDirection = currentSortDirection === 'asc' ? 'desc' : 'asc';
                
                // 정렬 실행
                sortAndNumberPosts(currentSortDirection);
                
                // 페이지네이션 재설정 (첫 페이지로 이동)
                currentPage = 1;
                setupPagination();
                showCurrentPage();
            });
        }
    }

    /**
     * 공지사항 제목을 실시간으로 검색하는 기능을 설정하는 함수
     */
    function setupSearchFunctionality() {
        const searchInput = document.getElementById('searchInput');
        const tableBody = document.querySelector('.notice-table tbody');
        // '결과 없음' 행을 제외한 모든 데이터 행을 선택합니다.
        const allDataRows = tableBody.querySelectorAll('tr:not(.no-results-row)');
        const noResultsRow = tableBody.querySelector('.no-results-row');

        // 검색 로직을 수행하는 내부 함수
        const filterRows = () => {
            // 입력된 검색어의 양쪽 공백을 제거하고 소문자로 변환합니다.
            const searchTerm = searchInput.value.toLowerCase().trim();
            let visibleRowCount = 0;

            // 검색 중일 때는 페이지네이션을 숨기고 모든 결과를 표시
            if (searchTerm !== '') {
                allDataRows.forEach(row => {
                    // [수정] 클래스('.col-title') 대신 두 번째 td 요소를 직접 선택하도록 변경합니다.
                    // .col-title 클래스는 thead의 th에만 있어, tbody의 td에서는 제목을 찾지 못하는 오류를 수정합니다.
                    const titleCell = row.querySelector('td:nth-child(2)');
                    if (titleCell) {
                        const title = titleCell.textContent.toLowerCase();
                        // 검색어가 제목에 포함되어 있는지 확인합니다.
                        const isVisible = title.includes(searchTerm);
                        // 결과에 따라 행을 보이거나 숨깁니다.
                        row.style.display = isVisible ? '' : 'none';
                        if (isVisible) {
                            visibleRowCount++;
                        }
                    }
                });
                
                // 검색 중일 때는 페이지네이션 숨기기
                document.querySelector('.pagination').style.display = 'none';
                
                // 보이는 행이 하나도 없으면 "결과 없음" 메시지를 표시하고, 그렇지 않으면 숨깁니다.
                noResultsRow.style.display = visibleRowCount === 0 ? '' : 'none';
            } else {
                // 검색어가 없으면 페이지네이션 표시하고 현재 페이지만 보이기
                document.querySelector('.pagination').style.display = '';
                showCurrentPage();
                
                // 검색어가 없을 때는 "결과 없음" 메시지를 숨깁니다
                noResultsRow.style.display = 'none';
                
                // 검색이 끝나면 현재 정렬 상태를 다시 적용
                sortAndNumberPosts(currentSortDirection);
            }
        };

        // 검색창에 키보드 입력이 발생할 때마다 필터링 함수를 호출합니다.
        searchInput.addEventListener('input', filterRows);
    }

    // 게시물을 최신순으로 정렬하고 번호를 자동으로 매깁니다.
    sortAndNumberPosts(currentSortDirection);
    
    // 최신글 배지 기능을 설정합니다.
    setupNewBadge();
    
    // 페이지네이션 기능을 설정합니다.
    setupPagination();
    
    // 첫 번째 페이지의 게시물을 표시합니다.
    showCurrentPage();
    
    // 공지사항 링크 클릭 이벤트를 설정합니다.
    setupNoticeLinks();
    
    // 함수를 호출하여 검색 기능을 설정합니다.
    setupSearchFunctionality();
    
    // 정렬 기능을 설정합니다.
    setupSortingFunctionality();

    // 뷰 모드 토글 기능을 설정합니다.
    setupViewMode();
    
    // 다크모드 토글 기능을 설정합니다.
    setupDarkMode();
});