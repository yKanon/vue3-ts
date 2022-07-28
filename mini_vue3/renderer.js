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

const patch = (n1, n2) => {
  if (n1.tag !== n2.tag) {
    const n1ParentEl = n1.el.parentElement;
    n1ParentEl.removeChild(n1.el);
    mount(n2, n1ParentEl);
  } else {
    // 处理props
    let el = (n2.el = n1.el);

    for (const key in n2.props) {
      const oldValue = n1.props[key];
      const newValue = n2.props[key];

      if (oldValue !== newValue) {
        if (key.startsWith('on')) {
          el.addEventListener(key.slice(2).toLowerCase(), newValue);
        } else {
          el.setAttribute(key, newValue);
        }
      }
    }

    for (const key in n1.props) {
      if (!(key in n2.props)) {
        if (key.startsWith('on')) {
          el.removeEventListener(key.slice(2).toLowerCase(), n1.props[key]);
        } else {
          el.removeAttribute(key, oldValue);
        }
      }
    }

    // 处理children null string array
    let oldChildren = n1.children || [];
    let newChildren = n2.children || [];

    if (typeof newChildren === 'string') {
      // 新旧都是string
      if (typeof oldChildren === 'string') {
        if (newChildren !== oldChildren) {
          el.textContent = newChildren;
        }
      } else {
        // 数组转字符串
        el.innerHTML = newChildren;
      }
    } else {
      // 字符串转数组
      if (typeof oldChildren === 'string') {
        el.innerHTML = '';
        newChildren.forEach((child) => mount(child, el));
      } else {
        // 数组转数组
        const commonLength = Math.min(oldChildren.length, newChildren.length);
        for (let i = 0; i < commonLength; i++) {
          patch(oldChildren[i], newChildren[i]);
        }

        // 新数组的长度大于旧数组
        if (newChildren.length > oldChildren.length) {
          newChildren
            .slice(oldChildren.length)
            .forEach((child) => mount(child, el));
        }

        // 旧数组的长度大于新数组
        if (newChildren.length < oldChildren.length) {
          oldChildren.slice(newChildren.length).forEach((child) => {
            el.removeChild(child.el);
          });
        }
      }
    }
  }
};
