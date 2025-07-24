// 이 스크립트는 DOM이 완전히 로드된 후에 실행됩니다.
document.addEventListener('DOMContentLoaded', function() {

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
     * URL 파라미터에서 공지사항 ID를 가져오는 함수
     */
    function getNoticeIdFromURL() {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get('id');
    }

    /**
     * 공지사항 데이터를 가져오는 함수
     */
    function getNoticeData(noticeId) {
        // 공지사항 데이터 (실제로는 서버에서 가져오거나 데이터베이스에서 조회)
        const noticeData = {
            'server-maintenance': {
                title: '공지사항 업데이트',
                author: '고양이',
                date: '2025-07-12',
                content: `
                    <h2>공지사항 업데이트</h2>
                    <p>안녕하세요. 더 나은 서비스를 <br>제공하기 위해 공지사항 탭을 리뉴얼했습니다.</p>
                    
                    <h3>점검 일정</h3>
                    <ul>
                        <li><strong>점검 일시:</strong> 2025년 7월 12일 (토요일) 오후 3시 ~ 오후 3시 30분</li>
                        <li><strong>점검 시간:</strong> 약 30분</li>
                        <li><strong>점검 내용:</strong> 공지사항 탭 리뉴얼</li>
                    </ul>
                    
                    <h3>점검 내용용</h3>
                    <p>다음과 같은 내용이 포함됩니다.:</p>
                    <ul>
                        <li>공지사항 사이트 추가</li>
                        <li>다크모드 추가</li>
                        <li>Ui/ux개편 및 모바일 반응형 디자인 추가</li>
                    </ul>
                    
                    <blockquote>
                        <p><strong>주의사항:</strong> 점검 시간을 미리 확인하시고, 중요한 작업이 있다면 점검 전에 완료해 주시기 바랍니다.</p>
                    </blockquote>
                    
                    <h3>문의사항</h3>
                    <p>점검과 관련하여 궁금한 점이 있으시면 원트크 갤러리리로 문의해 주세요.</p>
                    <ul>
                        <li>사이트 주소: https://gall.dcinside.com/mgallery/board/lists/?id=onepiecetc</li>
                    </ul>
                    
                    <p>불편을 끼쳐 죄송합니다. 더 나은 서비스로 보답하겠습니다.</p>
                `
            },
            'security-patch': {
                title: '신규 캐릭터 DB 추가완료',
                author: '고양이',
                date: '2025-07-11',
                content: `
                    <h2>신규 캐릭터가 추가되었습니다.</h2>
                    <p>해당 캐릭터는 기존 데이터베이스에 정상적으로 등록이 완료되었습니다.</p>
                    
                    <h3>신규 캐릭터 리스트</h3>
                    <ul>
                        <li>보아 행콕 - 여제를 돋보이게 하는 물보라</li>
                        <li>포트거스 D. 에이스 - 흰 수염의 새 아들</li>
                        <li>마샬 D. 티치 - 날아든 소식</li>
                        <li>마르코 - 날아든 소식</li>
                    </ul>
                    
                    
                    <blockquote>
                        <p><strong>안내:</strong> 패치 적용으로 인한 서비스 중단은 없었으며, 모든 기능이 정상적으로 작동합니다.</p>
                    </blockquote>
                    
                    <h3>업데이트 예정사항</h3>
                    <p>추후 해당 내용을 기재해놓겠습니다.</p>
                    
                    <p>감사합니다.</p>
                `
            },
            'security-patch2': {
                title: '뉴비들이 자주물어보는 질문 사이트 런칭',
                author: '고양이',
                date: '2025-07-16',
                content: `
                    <h2>뉴비들이 자주 물어보는 질문사이트가 런칭예정입니다.</h2>
                    <p>현재 기능과 Ui부분들은 작업이 완료되었고 질문리스트 데이터를 옮기는 작업을 진행중입니다.</p>
                    
                    <h3>QnA사이트 기능</h3>
                    <ul>
                        <li>검색창 기능 구현</li>
                        <li>DB바로가기 사이드바 구현</li>
                        <li>모바일, PC버전 Ui 반응형 구현</li>
                        <li>세부 사이드바 구현</li>
                    </ul>
                    
                    
                    <blockquote>
                        <p><strong>안내:</strong> 패치 적용으로 인한 서비스 중단은 없었으며, 모든 기능이 정상적으로 작동합니다.</p>
                    </blockquote>
                    
                    <h3>사이트 주소</h3>
                    <p>추후 해당 내용을 기재해놓겠습니다.</p>
                    
                    <p>감사합니다. </p>
                `
            },

            'security-patch3': {
                title: '[기능추가]바로가기버튼 추가 및 태그기능추가',
                author: '고양이',
                date: '2025-07-17',
                content: `
                    <p>메인 화면에 캐릭터DB 바로가기 버튼이 추가되었습니다.</p>
                    <p>기존에 사라진 태그기능이 다시 추가되었습니다.</p>
                    <P>신규캐릭터의 하단 태그가 보이지 않는 오류를 수정하였습니다.</P>

                    <blockquote>
                        <p><strong>안내:</strong> 패치 적용으로 인한 서비스 중단은 없었으며, 모든 기능이 정상적으로 작동합니다.</p>
                    </blockquote>

                    <p>감사합니다. </p>
                `
            },

            'security-patch4': {
                title: '[업데이트 완료]7/19일 신규캐릭터추가',
                author: '고양이',
                date: '2025-07-17',
                content: `
                    <p>해당 업데이트가 완료되면 제목이 [업데이트 완료]라고 변경됩니다.</p>
                    <p>7월19일 유대/서포트패스 신규캐릭터가 추가될 예정입니다.</p>
                    <P>추가 캐릭터 목록은 아래와 같습니다.</P>

                    <h1>신규 캐릭터 목록</h1>
                    <ul>
                        <li>Mr.0&미스 올 선데이 - 사막에 퍼지는 불온한 그림자</li>
                        <li>돈키호테 도플라밍고 - 새로운 칠무해를 향한 미소</li>
                        <li>알비다&코비</li>
                        <li>미호크&페로나 - 인연이 맺어 준 특이한 관계</li>
                    </ul>

                    <blockquote>
                        <p><strong>안내:</strong> 패치 적용으로 인한 서비스 중단은 없었으며, 모든 기능이 정상적으로 작동합니다.</p>
                    </blockquote>

                    <p>감사합니다. </p>
                `
            },

            'security-patch5': {
                title: '일부 캐릭터 초월 필살기 미표시 오류수정',
                author: '고양이',
                date: '2025-07-17',
                content: `
                    <p>제보를 받아 일부 캐릭터의 초월 필살기들이 미표시되는 부분을 코드를 추가하여 수정하였습니다</P>

                    <blockquote>
                        <p><strong>안내:</strong> 패치 적용으로 인한 서비스 중단은 없었으며, 모든 기능이 정상적으로 작동합니다.</p>
                    </blockquote>

                    <p>감사합니다. </p>
                `
            },

            'security-patch6': {
                title: '[번역완료]캐릭터 획득 경로 태그 번역',
                author: '고양이',
                date: '2025-07-20',
                content: `
                    <p>기존 상세정보창 하단 끝에서 보이는 획득경로 태그를 번역완료하였습니다.</P>
                    <p>이제 하단에서 캐릭터 획득경로를 볼 수 있습니다.</P>

                    <blockquote>
                        <p><strong>안내:</strong> 패치 적용으로 인한 서비스 중단은 없었으며, 모든 기능이 정상적으로 작동합니다.</p>
                    </blockquote>

                    <p>감사합니다. </p>
                `
            },

            'security-patch7': {
                title: '[업데이트 완료]메인Ui 교체',
                author: '고양이',
                date: '2025-07-23',
                content: `
                    <p>기존 메인Ui 창을 새롭게 리디자인했습니다.</P>
                    <p>이제 하단에서 최근 추가내역을 쉽게 확인할 수 있습니다.</P>

                    <blockquote>
                        <p><strong>안내:</strong> 패치 적용으로 인한 서비스 중단은 없었으며, 모든 기능이 정상적으로 작동합니다.</p>
                    </blockquote>

                    <p>감사합니다. </p>
                `
            },

            'security-patch8': {
                title: '[업데이트 완료]7/26일 갓벨리 페스 캐릭터추가',
                author: '고양이',
                date: '2025-07-24',
                content: `
                    <p>7월 24일 갓벨리 스고페스 캐릭터가 추가되었습니다.</p>
                    <P>추가 캐릭터 목록은 아래와 같습니다.</P>

                    <h1>신규 캐릭터 목록</h1>
                    <ul>
                        <li>몽키 D. 가프 – 밀고 들어가는 갓 밸리의 땅</li>
                        <li>피거랜드 갈링 성</li>
                        <li>엠포리오 이반코프 – 찬스를 노리는 노예</li>
                        <li>쿠마&지니</li>
                        <li>샬롯 링링 – 목표를 포착한 여해적</li>
                    </ul>

                    <blockquote>
                        <p><strong>안내:</strong> 패치 적용으로 인한 서비스 중단은 없었으며, 모든 기능이 정상적으로 작동합니다.</p>
                    </blockquote>

                    <p>감사합니다. </p>
                `
            },
        };

        return noticeData[noticeId] || null;
    }

    /**
     * 공지사항 내용을 화면에 표시하는 함수
     */
    function displayNotice(noticeData) {
        if (!noticeData) {
            // 공지사항을 찾을 수 없는 경우
            document.getElementById('noticeTitle').textContent = '공지사항을 찾을 수 없습니다';
            document.getElementById('noticeContent').innerHTML = `
                <div class="loading">
                    <p>요청하신 공지사항을 찾을 수 없습니다.</p>
                    <p>목록으로 돌아가서 다시 확인해 주세요.</p>
                </div>
            `;
            return;
        }

        // 제목, 작성자, 날짜 설정
        document.getElementById('noticeTitle').textContent = noticeData.title;
        document.getElementById('noticeAuthor').textContent = noticeData.author;
        document.getElementById('noticeDate').textContent = noticeData.date;
        
        // 내용 설정
        document.getElementById('noticeContent').innerHTML = noticeData.content;
        
        // 페이지 제목도 업데이트
        document.title = noticeData.title + ' - 공지사항';
    }

    /**
     * 뒤로가기 함수
     */
    window.goBack = function() {
        // 이전 페이지로 돌아가기 (목록 페이지)
        window.location.href = '../index.html';
    };

    /**
     * 초기화 함수
     */
    function initialize() {
        // URL에서 공지사항 ID 가져오기
        const noticeId = getNoticeIdFromURL();
        
        if (!noticeId) {
            // ID가 없으면 목록으로 리다이렉트
            window.location.href = '../index.html';
            return;
        }

        // 로딩 상태 표시
        document.getElementById('noticeContent').innerHTML = '<div class="loading">공지사항을 불러오는 중...</div>';

        // 공지사항 데이터 가져오기
        const noticeData = getNoticeData(noticeId);
        
        // 화면에 표시
        displayNotice(noticeData);
    }

    // 페이지 초기화 실행
    initialize();
    
    // 다크모드 토글 기능을 설정합니다.
    setupDarkMode();
}); 