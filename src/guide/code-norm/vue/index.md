# 7 .Vue 代码规范

## 7.1 通用配置

推荐使用箭头函数(保持this指向不变，避免后期定位问题的发杂度)。

```js
//【建议】业务开发中提倡的做法, 箭头函数配合const函数一起使用
const getTableListData = () => {}; // TODO

//【反例】尽量不要出现混用，如下：
function getDomeData() {}
const getDome1Data = () => {};

// 混用会导致可读性变差，而开发首要元素的可读性。
```

## 7.2 变量提升

在项目或者开发过程中，尽量使用let或者const定义变量，可以有效的规避变量提升的问题，不在赘述，注意const一般用于声明常量或者值不允许改变的变量。

## 7.3 数据请求

数据请求类、异步操作类需要使用try…catch捕捉异常。尽量避免回调地狱出现。

```js
// 推荐写法

/**
 * @description 获取列表数据
 * @return void
 */
const getTableListData = async () => {
  // 自己的业务处理TODO
  try {
    const res = await getTableListDataApi();
    const res1 = await getTableListDataApi1();
    // TODO
  } catch (error) {
    // 异常处理相关
  } finally {
    // 最终处理
  }
};

//【提倡】推荐接口定义带着Api结尾，比如我的方法是getTableListData，
//【提倡】内部逻辑调用的后端接口，那我的接口便可以定位为getTableListDataApi。
```

合理使用数据并发请求：

```js
// 场景描述：表头和表格数据都需要请求接口获取，可以使用并发请求。
/**
* 查询列表数据
*/
const getTableList = async () => {
  // TODO
  try {
    // 并行获取表格列数据和列表数据
    const [resColumns, resData] = await Promise.all([
      getTableColumnsApi({....}),
      getTableListApi({...}),
    ]);
    // TODO
  } catch (error) {
   // TODO
  } finally {
    // TODO
  }
};

//  Promise.all的一些执行细节不在赘述，但是注意区分和Promise.allSettled用法
//
//  Promise.all()方法会在任何一个输入的 Promise 被拒绝时立即拒绝。
// 相比之下，Promise.allSettled() 方法返回的 Promise 会等待所有
// 输入的 Promise 完成，不管其中是否有 Promise 被拒绝。如果你需
// 要获取输入可迭代对象中每个 Promise 的最终结果，则应使用allSettled()方法。
```

合理使用数据竞速请求：

```js
// 场景描述：某些业务需要请求多个接口，但是只要一个接口先返回便处理逻辑

let promise1 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('数据请求1');
  }, 1000);
});

let promise2 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('数据请求2');
  }, 500);
});

Promise.race([promise1, promise2]).then(result => {
  console.log(result); // 输出 "数据请求2"
});
```

注意：数据请求时一定要做好异常的捕获和处理，异常的捕获和处理可以增加程序的健壮性和提升用户使用体验。

## 7.4 单一职责原则

组件或者方法的编写一定要遵循单一职责原则

## 7.5 文件命名

功能菜单的入口文件一定要带着name，同时其他编写的业务组件也推荐带着name，同时name的命名规则大写驼峰，且尽量要全局唯一(避免后期定位问题增加复杂度)。

```js
<script setup  name='CustomName'> </script>

// 或者
export default defineComponent({
    name: 'CustomName',
    .......
})
```

## 7.6 组件使用

为了区分自己开发的组件和第三方库组件，在命名方式上需要有所不同。

使用第三方库组件时，需要用小写字母。

```js
<!-- element -->
<el-input></el-input>

<!-- vant -->
<van-button type="primary">主要按钮</van-button>
```

使用自己开发的组件，则需要使用大驼峰式命名。

```js
<!-- 自己开发的 Button 组件 -->
<Button>按钮</Button>

正确：<UserProfile />正确：<UserProfile />
```

## 7.7 v-for

出于性能考虑，必须为 v-for 设置 key 属性。key 的取值必须是唯一的，一般是使用 id 的值。 只有在找不到唯一值的情况下才允许使用 index 作为 key。

## 7.8 scoped

业务页面的 style 需要添加 scoped 属性来限制作用域。在开发组件时，为了方便在其他页面覆盖组件的样式，所以不建议添加 scoped 属性。

## 7.9 单文件组件顶级元素标签的顺序

```js
<template>...</template>
<script>/* ... */</script>
<style>/* ... */</style>
```

## 7.10 空行

在多个方法之间添加一个空行，可以增加可读性（避免拥挤）。

```js
methods: {
  getName() {

  },

  getAge() {

  },
}
```

## 7.11 样式单独存放

通常情况下，样式是通过 `<style>` 标签写在 .vue 文件里的。但如果 css 样式多到数百行时，这时就需要将样式抽离出来单独放一个文件里。

```bash
# 抽离前
- Home.vue
# 样式抽离后
- Home
  - index.vue
  - index.css
```

## 7.12 逻辑分支

当我们编写业务代码时，经常会遇到下面这种写法，写法没有对错只是有更好的优化方式：

```js
// 场景一
if (type === 1) {
  // TODO
} else if (type === 2) {
  // TODO
} else if (type === 3) {
  // TODO
} else if (type === 4) {
  // TODO
} else if (type === 5) {
  // TODO
} else {
  // TODO
}

// 场景二
if (type === 1) {
  if (type1 === 1) {
    if (type2 === 1) {
      if (type3 === 1) {
        // TODO
      }
    }
  }
}
```

场景一：违背了开闭原则(对扩展开放、对修改关闭)和单一职责原则。场景一可以进行如下的优化：

```js
// 优化方式一：字典映射方式
const typeHandlers = {
  1: handleType1,
  2: handleType2,
  3: handleType3,
  4: handleType4,
  5: handleType5,
  default: handleDefault,
};
const handler = typeHandlers[type] || typeHandlers.default;
handler();

// 优化方式二：高阶函数方式
const handleType1 = () => {
  /* TODO for type 1 */
};
const handleType2 = () => {
  /* TODO for type 2 */
};
// 其他处理函数...
const handlers = [handleType1, handleType2 /*...*/];
const processType = type => {
  if (handlers[type - 1]) handlers[type - 1]();
};
processType(type);
```

场景二：违背了圈复杂度原则和单一职责原则，场景二可以进行如下优化：

```js
// 优化方式一
const isValidType = () => {
  return type === 1 && type1 === 1 && type2 === 1 && type3 === 1;
};
if (isValidType()) {
}

// 优化方式二：使用"早返回原则"或者叫"错误前置原则"进行优化
if (type !== 1) return;
if (type1 !== 1) return;
if (type2 !== 1) return;
if (type3 !== 1) return;
// TODO
```

上面只是简单列举的优化的思路，方案有很多，合理即可。

## 7.13 删除冗余

在业务开发过程中，我们经常会对代码进行注释，有些文件中会出现好多处注释，当然这些注释后边可能会放开，但是官方提倡的做法是尽量删除掉这些注释的代码，真正需要哪些代码，在还原回来即可。

另一个常见的问题是：console打印和debugger之类的，虽然说可以通过插件配置在打包的时候删除掉，但是官方提倡的是在源码层面一旦调试完成就立即删除。

还有单文件不要超过600行代码，当然也可以适当根据实际情况放宽，一般情况下超过这个行数就要进行代码的拆分，拆分的方式包括组件、方法、样式、配置项等。但是过度拆分也会导致碎片化的问题，需要合理把握。

复杂功能的拆分可以考虑使用异步组件。

## 7.14 路由懒加载

现有框架里面一般不需要我们接触这块，因为菜单和路由已经是封装完善的，但是我们也需要知道路由懒加载的概念：

```js
// 将
// import UserDetails from './views/UserDetails.vue'
// 替换成
const UserDetails = () => import('./views/UserDetails.vue')

const router = createRouter({
  // ...
  routes: [
    { path: '/users/:id', component: UserDetails }
    // 或在路由定义里直接使用它
    { path: '/users/:id', component: () => import('./views/UserDetails.vue') },
  ],
})
```

路由懒加载有利于vite对不同的菜单功能进行代码分割，降低打包之后的代码体积，从而增加访问速度。需要注意的是：不要在路由中使用异步组件。异步组件仍然可以在路由组件中使用，但路由组件本身就是动态导入的。

## 7.15 运算符

es新特性中有几个新增的运算符你需要了解，因为它可以简化你的编码编写。

```js
// ?? ( 空值合并运算符)：这个运算符主要是左侧为null和undefined，直接返回右侧值
// 请在开发过程中合理使用||和??
let result = value ?? '默认值';
console.log('result', result);



// ?.(可选链运算符): 用于对可能为 null 或 undefined 的对象进行安全访问。
// 建议这个属性要用起来，防止数据不规范时控制台直接报错
const obj = null;
let prop = obj?.property;
console.log('prop', prop);



// ??= (空值合并赋值操作符): 用于在变量已有非空值，避免重复赋值。
let x = null;
x ??= 5; // 如果 x 为 null 或 undefined，则赋值为 5



// ?= (安全复制运算符)：旨在简化错误处理。改运算符与 Promise、async 函数以及任何实现了 Symbol.result 方法的对象兼容，简化了常见的错误处理流程。
// 注意：任何实现了 Symbol.result 方法的对象都可以与 ?= 运算符一起使用，Symbol.result 方法返回一个数组，第一个元素为错误，第二个元素为结果。
const [error, response] ?= await fetch("https://blog.conardli.top");

```

## 7.16 vue2 规则

组件/实例的选项应该有统一的顺序。
这是我们推荐的组件选项默认顺序。它们被划分为几大类，所以你也能知道从插件里添加的新 property 应该放到哪里。

### 7.16.1 全局感知选项 (需要知道组件外部定义的选项)

```js
{
  name: 'MyComponent',
  components: {},
  directives: {},
  filters: {}
}
```

### 7.16.2 模板依赖选项 (模板中使用的资源)

```js
{
  props: {},
  emits: {},
  expose: {}
}
```

### 7.16.3 组合选项 (合并属性到选项中)

```js
{
  mixins: [],
  extends: {},
  provide: {},
  inject: {}
}
```

### 7.16.4 接口选项 (组件的接口)

```js
{
  inheritAttrs: true,
  setup() {},
  data() {},
  computed: {},
  watch: {},
  methods: {}
}
```

### 7.16.5 生命周期钩子 (按调用顺序排列)

```js
{
  beforeCreate() {},
  created() {},
  beforeMount() {},
  mounted() {},
  beforeUpdate() {},
  updated() {},
  activated() {},
  deactivated() {},
  beforeUnmount() {},
  unmounted() {},
  errorCaptured() {},
  renderTracked() {},
  renderTriggered() {}
}
```

### 7.16.6 渲染选项 (模板/渲染函数的替代方案)

```js
{
  template: '',
  render() {}
}
```

### 7.16.7 完整示例

- setup() 选项：如果使用 Composition API 与 Options API 混用，setup() 应该放在 data() 之前

```js
export default {
  name: 'MyComponent',

  components: {
    ChildComponent,
  },

  directives: {
    focus,
  },

  props: {
    value: {
      type: String,
      required: true,
    },
  },

  emits: ['input'],

  mixins: [validationMixin],

  provide() {
    return {
      formData: this.formData,
    };
  },

  inject: ['parentData'],

  inheritAttrs: false,

  data() {
    return {
      formData: {
        username: '',
        password: '',
      },
    };
  },

  computed: {
    fullName() {
      return `${this.firstName} ${this.lastName}`;
    },
  },

  watch: {
    value(newVal) {
      this.updateValue(newVal);
    },
  },

  methods: {
    submitForm() {
      this.$emit('submit', this.formData);
    },

    updateValue(value) {
      // 更新逻辑
    },
  },

  created() {
    this.fetchData();
  },

  mounted() {
    this.setupEventListeners();
  },

  beforeUnmount() {
    this.cleanupEventListeners();
  },

  template: `
    <form @submit.prevent="submitForm">
      <input v-model="formData.username">
      <input v-model="formData.password">
      <button type="submit">Submit</button>
    </form>
  `,
};
```

## 7.17 Vue3 组合式配置规范

### 7.17.1 Hooks使用

在Vue3的项目中强烈推荐使用hooks进行功能的拆分和复用，这是Vue官方团队推荐的编写方式，下面来看一个列子，比如说，我要实现一个弹框的功能，下面常见的写法，第一种偏后端思维的写法：

```js
const editModel = reactive({
  isShow: false,
  form: {
    name: 'ANDROID',
    // ......
  },
  showFunc: () => {
    // 显示逻辑
  },
  cancelFunc: () => {
    // 取消逻辑
  },
  submitFunc: () => {
    // 提交逻辑
  },
});
```

或者其他的类似写法，不在赘述。其实都可以换成hooks的写法：

```js
const useEditModel = () => {
  const isShow = ref(false);

  /**
   * 显示弹框
   */
  const showModal = () => {};

  /**
   * 关闭弹框
   */
  const cancelModal = () => {};

  /**
   * 提交操作
   */
  const submitModal = () => {};

  onBeforeMount(() => {
    // TODO
  });

  return {
    isShow,
    showModal,
    cancelModal,
    submitModal,
  };
};

// 其他地方使用
const { isShow, showModal, cancelModal, submitModal } = useEditModel();
```

简单总结一下hooks编写的思想：
::: info
在函数作用域内定义、使用响应式\非响应性状态、变量或者从多个函数中得到的状态、变量、方法进行组合，从而处理复杂问题。
:::

### 7.17.2 组合式API

组合式API本身是为了灵活，但是项目中使用时出现了五花八门的情况，有的把expose写到了最开始，把组件引入放到最下面，当你不确定setup语法糖下使用顺序时，可以参考下面的顺序：

```bash
<script setup>
  // import语句
  // Props(defineProps)
  // Emits(defineEmits)
  // 响应性变量定义
  // Computed
  // Watchers
  // 函数
  // 生命周期
  // Expose(defineExpose)
</script>
```

### 7.17.3 响应性变量

合理的使用响应性变量。数据量很大的对象或者数组，同时属性又是嵌套的对象，你的业务场景只需要第一层属性具有响应性，推荐使用shallowRef和shallowReactive定义响应性变量，这时不在推荐使用ref和reactive了。

### 7.17.4 监听器使用

在Vue3中使用监听器watchEffect和watch时，需要留意使用方式，先看watchEffect：
当模板中改变b的值时，watchEffect无法监听 '执行了更新操作'。

```vue
<script setup>
import { ref, watchEffect } from 'vue';

const a = ref(true);
const b = ref(false);

watchEffect(() => {
  if (a.value || b.value) {
    console.log('执行了更新操作');
  }
});

const test = () => (b.value = !b.value);
</script>

<template>
  <button @click="test">改变b的值</button>
  <h2>当前b的值:{{ b }}</h2>
</template>
```

下面的示例：
当模板中改变b的值时，watchEffect无法监听 '执行了更新操作'。

```vue
<script setup>
import { ref, watchEffect } from 'vue';

const getInfo = async () => {
  await new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(111);
    }, 2000);
  });
};

watchEffect(async () => {
  // 请求信息
  await getInfo();
  if (b.value) console.log('执行了更新操作');
});

const test = () => (b.value = !b.value);
</script>

<template>
  <button @click="test">改变b的值</button>
  <h2>当前b的值:{{ b }}</h2>
</template>
```

用watchEffect一定要注意两点：

::: info
1、要使watchEffect可以第一时间捕捉到响应性变量；
2、异步操作触发微任务会影响watchEffect第一时间捕捉响应性变量。
当你watchEffect使用不是很熟悉的话，建议尽量使用watch。
:::

watch注意点：当你的组件内部使用watch较多或者你想手动消除watch的复杂度。

需要留意的是Vue3.5+中新增了deep属性可以直接传入数字，告诉wacth监听到响应性数据到第几层。

### 7.17.5 暴露方法

当我们想要暴露第三方组件的所有属性时，我们怎么快速的暴露？

使用expose需要一个一个写，显然太麻烦，可以使用下面的方式：

```js
expose(
  new Proxy(
    {},
    {
      get(target, key) {
        // CustomDomRef是定义的模板中的ref dom节点
        return CustomDomRef.value?.[key];
      },
      has(target, key) {
        return key in CustomDomRef.value;
      },
    }
  )
);
```

### 7.17.6 异步组件

Vue3中提供了异步组件(defineAsyncComponent)的定义，异步组件的优点：

::: info
1、在运行时是懒加载的，可以更好的让浏览器渲染其他功能。
2、有利于vite打包时进行代码分割。
:::

```vue
// 简单示例
<script setup>
import { defineAsyncComponent } from 'vue';

const AdminPage = defineAsyncComponent(() => import('./components/AdminPageComponent.vue'));
</script>

<template>
  <AdminPage />
</template>

// 复杂示例 // 异步组件的定义 import { defineAsyncComponent } from "vue"; export const PreferenceItemComs: any = {
Residence: defineAsyncComponent(() => import("./Residence.vue")), PastHistory: defineAsyncComponent(() =>
import("./PastHistory.vue")), AllergyHistory: defineAsyncComponent(() => import("./AllergyHistory.vue")), Diagnose:
defineAsyncComponent(() => import("./Diagnose.vue")), }; // 异步组件的使用
<keep-alive>
  <component
    :is="getCurrentComponents()"
  ></component>
</keep-alive>

/** * 获取当前需要渲染的组件 */ const getCurrentComponents = () => { const projectType = activeName.value; if
(projectType && PreferenceItemComs[projectType]) { return PreferenceItemComs[projectType]; } return null; };
```
