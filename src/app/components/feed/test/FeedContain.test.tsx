import {render, screen} from '@testing-library/react';
import {FeedContain} from '../FeedContain';

describe('FeedContain 컴폰넌트 테스트', () => {
  it('컴포넌트가 정상적으로 렌더링돼야 함 ', async () => {
    render(<FeedContain />);

    const mainElement = screen.getByText('글쓰기 아이콘');
    expect(mainElement).toBeDefined();

    const {container} = render(<FeedContain />);
    expect(container.querySelectorAll('div').length).toBeGreaterThan(1);

    // it('새 포스트 게시 ', () => {});

    // it('좋아요 기능 ', () => {});

    // it('댓글 작성 ', () => {});

    // it('포스트 공유 ', () => {});

    // it('무한 스크롤 ', () => {});

    // it('실시간 업데이트 ', () => {});
    // it('포스트 필터링 ', () => {});
    // it('포스트 삭제 ', () => {});

    // it('피드 접근성 ', () => {});
    // it('피드 렌더링 ', () => {});
  });
});
