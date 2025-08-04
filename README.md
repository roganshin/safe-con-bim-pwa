# 📱 Safe Con-BIM PWA 설치 가이드

Safe Con-BIM을 iOS/Android에서 네이티브 앱처럼 사용하는 방법을 안내합니다.

## 🚀 iOS(아이폰/아이패드)에서 설치하기

### 1단계: Safari에서 접속
- **중요**: 반드시 Safari 브라우저를 사용해야 합니다
- Chrome, Edge 등 다른 브라우저에서는 PWA 설치가 제한됩니다

### 2단계: 홈 화면에 추가
1. Safari 하단의 **공유 버튼 (□↗)** 터치
2. 목록에서 **"홈 화면에 추가"** 선택
3. 앱 이름 확인 후 **"추가"** 터치

### 3단계: 앱으로 실행
- 홈 화면에 생성된 아이콘 터치
- 전체화면 모드로 실행됩니다
- 상태바와 주소창이 숨겨져 네이티브 앱과 동일한 경험

## 🤖 Android에서 설치하기

### Chrome 브라우저 사용
1. Chrome에서 웹사이트 접속
2. 주소창 옆의 **"홈 화면에 추가"** 팝업 터치
3. 또는 메뉴(⋮) → "앱 설치" 선택

### Samsung Internet 사용
1. 웹사이트 접속 후 하단 메뉴 터치
2. **"홈 화면에 추가"** 선택

## ✨ PWA 앱의 장점

### 📱 네이티브 앱 경험
- 전체화면 실행 (상태바/주소창 숨김)
- 홈 화면 아이콘으로 빠른 접근
- 앱 전환기에서 독립적인 앱으로 표시

### 🔄 오프라인 지원
- 인터넷 연결 없이도 기본 기능 사용 가능
- 캐시된 데이터로 빠른 로딩
- 연결 복구 시 자동 동기화

### 📲 푸시 알림 (향후 지원)
- 중요한 안전 알림 수신
- 체크리스트 알림
- 비상 상황 알림

### 🔄 자동 업데이트
- 새 버전 자동 감지
- 백그라운드에서 업데이트 다운로드
- 사용자 확인 후 즉시 적용

## 🛠️ 개발자를 위한 정보

### 필수 요구사항
- **HTTPS 환경**: PWA는 HTTPS에서만 동작
- **Service Worker**: 오프라인 지원 및 캐싱
- **Web App Manifest**: 앱 메타데이터 정의

### 파일 구조
```
프로토타입/
├── SafeCon-BIM_Mobile_App.html  # 메인 앱 파일
├── manifest.json                 # PWA 매니페스트
├── sw.js                        # 서비스 워커
├── .htaccess                    # Apache 서버 설정
└── 로고이미지.png               # 앱 아이콘
```

### 서버 설정
Apache 서버인 경우 `.htaccess` 파일이 자동으로 설정을 적용합니다.

Nginx 서버인 경우:
```nginx
# MIME 타입 설정
location ~* \.webmanifest$ {
    add_header Content-Type application/manifest+json;
}

# 캐시 설정
location ~* \.(png|jpg|jpeg|css|js)$ {
    expires 1y;
    add_header Cache-Control "public, immutable";
}
```

### 디버깅
Chrome 개발자 도구에서 PWA 상태 확인:
1. F12 → Application 탭
2. Manifest 섹션에서 매니페스트 검증
3. Service Workers에서 SW 상태 확인

## 🔧 문제해결

### PWA 설치 옵션이 나타나지 않을 때
- HTTPS 환경인지 확인
- manifest.json 파일이 올바르게 로드되는지 확인
- 서비스 워커가 정상 등록되었는지 확인

### iOS에서 PWA가 제대로 동작하지 않을 때
- Safari 브라우저 사용 여부 확인
- iOS 버전이 11.3 이상인지 확인
- 프라이빗 브라우징 모드가 아닌지 확인

### 오프라인에서 일부 기능이 동작하지 않을 때
- 서비스 워커 캐시 상태 확인
- 네트워크 복구 시 자동 동기화 대기

## 📞 지원

기술적 문제나 질문이 있으시면:
- 개발자 콘솔에서 오류 메시지 확인
- 브라우저 버전 및 디바이스 정보 확인
- 네트워크 연결 상태 확인

---

## 📋 버전 정보

- **버전**: 2.0 (PWA 최적화)
- **지원 플랫폼**: iOS 11.3+, Android 5.0+
- **지원 브라우저**: Safari (iOS), Chrome/Samsung Internet (Android)
- **마지막 업데이트**: 2025년 1월