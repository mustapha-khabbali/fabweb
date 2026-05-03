import { useState } from 'react';
import ProjectHome from '../project/ProjectHome';
import ProjectCreateForm from '../project/ProjectCreateForm';
import ProjectDetail from '../project/ProjectDetail';
import RecycleBin from '../project/RecycleBin';
import ArticleHome from '../project/ArticleHome';
import ArticleCreateForm from '../project/ArticleCreateForm';
import ArticlePending from '../project/ArticlePending';

const VIEWS = {
  HOME: 'home',
  CREATE: 'create',
  DETAIL: 'detail',
  RECYCLE: 'recycle',
  ARTICLE_HOME: 'article-home',
  ARTICLE_CREATE: 'article-create',
  ARTICLE_PENDING: 'article-pending',
};

export default function MyProjectTab() {
  const [view, setView] = useState(VIEWS.HOME);

  const renderView = () => {
    switch (view) {
      case VIEWS.HOME:
        return <ProjectHome onCreateProject={() => setView(VIEWS.CREATE)} onShowDetail={() => setView(VIEWS.DETAIL)} onShowRecycle={() => setView(VIEWS.RECYCLE)} onShowArticles={() => setView(VIEWS.ARTICLE_HOME)} />;
      case VIEWS.CREATE:
        return <ProjectCreateForm onBack={() => setView(VIEWS.HOME)} />;
      case VIEWS.DETAIL:
        return <ProjectDetail onBack={() => setView(VIEWS.HOME)} />;
      case VIEWS.RECYCLE:
        return <RecycleBin onBack={() => setView(VIEWS.HOME)} />;
      case VIEWS.ARTICLE_HOME:
        return <ArticleHome onBack={() => setView(VIEWS.HOME)} onCreateArticle={() => setView(VIEWS.ARTICLE_CREATE)} onShowPending={() => setView(VIEWS.ARTICLE_PENDING)} />;
      case VIEWS.ARTICLE_CREATE:
        return <ArticleCreateForm onBack={() => setView(VIEWS.ARTICLE_HOME)} />;
      case VIEWS.ARTICLE_PENDING:
        return <ArticlePending onBack={() => setView(VIEWS.ARTICLE_HOME)} />;
      default:
        return <ProjectHome onCreateProject={() => setView(VIEWS.CREATE)} onShowDetail={() => setView(VIEWS.DETAIL)} onShowRecycle={() => setView(VIEWS.RECYCLE)} onShowArticles={() => setView(VIEWS.ARTICLE_HOME)} />;
    }
  };

  return (
    <div className="flex flex-col h-full">
      {renderView()}
    </div>
  );
}
