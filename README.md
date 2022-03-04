# 2022_Spring_Frontend
---
## HW-1 用`html`+`css`实现网页的一个模块
前两天刚用LitePress(WordPress国内发行版)搭建了一个博客，故这里借用 Argon 的主题框架，简单实现了作者栏的显示效果，基本的文字排版在`<nav>...<\nav>`框架里
```html
<nav class="site-state">
    <div class="site-state-item site-state-posts">
            <a style="cursor: default;">
                <span class="site-state-item-count">1</span>
                <span class="site-state-item-name">文章</span>
            </a>
    </div>
    <div class="site-state-item site-state-categories">
        <a data-toggle="modal" data-target="#blog_categories">
            <span class="site-state-item-count">3</span>
            <span class="site-state-item-name">分类</span>
        </a>
    </div>
    <div class="site-state-item site-state-tags">
        <a data-toggle="modal" data-target="#blog_tags">
            <span class="site-state-item-count">0</span>
            <span class="site-state-item-name">标签</span>
         </a>
    </div>
</nav>
```