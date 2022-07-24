const h = (tag, props, children) => {
  // 创建 vnode
  return {
    tag,
    props,
    children,
  };
};

const mount = (vnode, container) => {
  // 创建出真实的原生标签。在vnode上保存，方便取值
  const el = (vnode.el = document.createElement(vnode.tag));

  // 处理props
  if (vnode.props) {
    for (const key in vnode.props) {
      const value = vnode.props[key];

      if (key.startsWith('on')) {
        el.addEventListener(key.slice(2).toLowerCase(), value);
      } else {
        el.setAttribute(key, value);
      }
    }
  }

  // 处理children
  if (vnode.children) {
    if (typeof vnode.children === 'string') {
      el.textContent = vnode.children;
    } else {
      vnode.children.forEach((child) => {
        mount(child, el);
      });
    }
  }

  container.appendChild(el);
};
