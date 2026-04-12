/**
 * presentation-manifest.js
 *
 * 발표 순서의 단일 source of truth.
 * 발표 셸은 이 배열만 소비하며, 폴더 스캔이나 파일명 정렬에 의존하지 않는다.
 *
 * section 전환:
 * - designPattern (record 1-10) -> programming (record 11-14)
 * - 전환은 MVVM(#10) 다음, Programming Paradigms overview(#11)에서 한 번만 발생한다.
 */

// eslint-disable-next-line no-unused-vars
const presentationManifest = [
  // ── designPattern (1-10) ──────────────────────────────────────
  {
    id: 'singleton',
    section: 'designPattern',
    title: 'Singleton',
    sourcePath: 'designPattern/singleton_pattern_slow_explainer.html',
    adapterPath: 'presentation/topics/01-singleton.html',
  },
  {
    id: 'factory',
    section: 'designPattern',
    title: 'Factory',
    sourcePath: 'designPattern/factory_pattern_full_interactive.html',
    adapterPath: 'presentation/topics/02-factory.html',
  },
  {
    id: 'strategy',
    section: 'designPattern',
    title: 'Strategy',
    sourcePath: 'designPattern/strategy_pattern_full_interactive.html',
    adapterPath: 'presentation/topics/03-strategy.html',
  },
  {
    id: 'observer',
    section: 'designPattern',
    title: 'Observer',
    sourcePath: 'designPattern/observer_pattern_full_interactive.html',
    adapterPath: 'presentation/topics/04-observer.html',
  },
  {
    id: 'proxy',
    section: 'designPattern',
    title: 'Proxy',
    sourcePath: 'designPattern/proxy_pattern_full_interactive.html',
    adapterPath: 'presentation/topics/05-proxy.html',
  },
  {
    id: 'iterator',
    section: 'designPattern',
    title: 'Iterator',
    sourcePath: 'designPattern/iterator_pattern_full_interactive.html',
    adapterPath: 'presentation/topics/06-iterator.html',
  },
  {
    id: 'revealing-module',
    section: 'designPattern',
    title: 'Revealing Module',
    sourcePath: 'designPattern/revealing_module_pattern_interactive.html',
    adapterPath: 'presentation/topics/07-revealing-module.html',
  },
  {
    id: 'mvc',
    section: 'designPattern',
    title: 'MVC',
    sourcePath: 'designPattern/mvc_pattern_full_interactive.html',
    adapterPath: 'presentation/topics/08-mvc.html',
  },
  {
    id: 'mvp',
    section: 'designPattern',
    title: 'MVP',
    sourcePath: 'designPattern/mvp_pattern_full_interactive.html',
    adapterPath: 'presentation/topics/09-mvp.html',
  },
  {
    id: 'mvvm',
    section: 'designPattern',
    title: 'MVVM',
    sourcePath: 'designPattern/mvvm_pattern_full_interactive.html',
    adapterPath: 'presentation/topics/10-mvvm.html',
  },

  // ── programming (11-14) ───────────────────────────────────────
  // section 전환: designPattern -> programming (여기서 한 번만 발생)
  {
    id: 'programming-paradigms-overview',
    section: 'programming',
    title: 'Programming Paradigms Overview',
    sourcePath: 'programming/programming_paradigms_revised.html',
    adapterPath: 'presentation/topics/11-programming-paradigms-overview.html',
  },
  {
    id: 'functional-programming',
    section: 'programming',
    title: 'Functional Programming',
    sourcePath: 'programming/functional_programming_core_keywords.html',
    adapterPath: 'presentation/topics/12-functional-programming.html',
  },
  {
    id: 'oop-deep-dive',
    section: 'programming',
    title: 'OOP Deep Dive',
    sourcePath: 'programming/oop_deep_dive_interactive.html',
    adapterPath: 'presentation/topics/13-oop-deep-dive.html',
  },
  {
    id: 'procedural-programming',
    section: 'programming',
    title: 'Procedural Programming',
    sourcePath: 'programming/procedural_programming_deep_dive.html',
    adapterPath: 'presentation/topics/14-procedural-programming.html',
  },
];
