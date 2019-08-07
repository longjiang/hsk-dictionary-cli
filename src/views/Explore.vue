<template>
  <div class="main mt-4">
    <div class="container">
      <div class="row">
        <div class="col-sm-12">
          <h4>Explore Words Endings</h4>
          <p>See how words are built.</p>
          <Loader class="mt-5" />
          <table class="table">
            <thead>
              <tr>
                <th>Pattern</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="root in rootsAugmented">
                <td class="character-example">
                  <a href="#/explore/roots/root.root">
                  <span
                    class="character-example-word"
                    v-if="root.word"
                    v-html="
                      Helper.highlight(
                        root.root,
                        root.word.simplified,
                        root.word.hsk
                      )
                    "
                  ></span
                  ></a>
                </td>
                <td>
                  <b>{{ root.count }}</b> HSK words match this pattern.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Helper from '@/lib/helper'

export default {
  mounted() {
    Helper.loaded(
      (LoadedAnnotator, LoadedHSKCEDICT, loadedGrammar, LoadedHanzi) => {
        for (let root of this.roots) {
          LoadedHSKCEDICT.lookupSimplified(
            words => {
              root.word = words[0]
              this.rootsAugmented.push(root)
            },
            [root.root.replace(/～/g, '')]
          )
        }
      }
    )
  },
  data() {
    return {
      Helper,
      rootsAugmented: [],
      roots: [
        {
          root: '～子',
          count: 59
        },
        {
          root: '不～',
          count: 38
        },
        {
          root: '～心',
          count: 28
        },
        {
          root: '～不～',
          count: 27
        },
        {
          root: '一～',
          count: 27
        },
        {
          root: '～气',
          count: 26
        },
        {
          root: '～力',
          count: 25
        },
        {
          root: '发～',
          count: 24
        },
        {
          root: '～理',
          count: 24
        },
        {
          root: '天',
          count: 23
        },
        {
          root: '无～',
          count: 22
        },
        {
          root: '公～',
          count: 22
        },
        {
          root: '～然',
          count: 21
        },
        {
          root: '打～',
          count: 21
        },
        {
          root: '机',
          count: 21
        },
        {
          root: '～动',
          count: 20
        },
        {
          root: '大～',
          count: 20
        },
        {
          root: '人～',
          count: 19
        },
        {
          root: '生～',
          count: 19
        },
        {
          root: '～实',
          count: 19
        },
        {
          root: '～面',
          count: 19
        },
        {
          root: '学',
          count: 19
        },
        {
          root: '本',
          count: 19
        },
        {
          root: '情',
          count: 19
        },
        {
          root: '分～',
          count: 18
        },
        {
          root: '～行',
          count: 18
        },
        {
          root: '～明',
          count: 18
        },
        {
          root: '对～',
          count: 18
        },
        {
          root: '～儿',
          count: 18
        },
        {
          root: '出～',
          count: 18
        },
        {
          root: '～业',
          count: 18
        },
        {
          root: '～定',
          count: 18
        },
        {
          root: '为',
          count: 18
        },
        {
          root: '要',
          count: 18
        },
        {
          root: '节',
          count: 18
        },
        {
          root: '光',
          count: 18
        },
        {
          root: '成～',
          count: 17
        },
        {
          root: '开～',
          count: 17
        },
        {
          root: '自～',
          count: 17
        },
        {
          root: '反～',
          count: 17
        },
        {
          root: '和',
          count: 17
        },
        {
          root: '现',
          count: 17
        },
        {
          root: '口',
          count: 17
        },
        {
          root: '记',
          count: 17
        },
        {
          root: '立',
          count: 17
        },
        {
          root: '制',
          count: 17
        },
        {
          root: '～意',
          count: 16
        },
        {
          root: '地～',
          count: 16
        },
        {
          root: '～道',
          count: 16
        },
        {
          root: '主～',
          count: 16
        },
        {
          root: '起',
          count: 16
        },
        {
          root: '家',
          count: 16
        },
        {
          root: '上',
          count: 16
        },
        {
          root: '后',
          count: 16
        },
        {
          root: '长',
          count: 16
        },
        {
          root: '用',
          count: 16
        },
        {
          root: '信',
          count: 16
        },
        {
          root: '～人',
          count: 15
        },
        {
          root: '～得',
          count: 15
        },
        {
          root: '平～',
          count: 15
        },
        {
          root: '年',
          count: 15
        },
        {
          root: '化',
          count: 15
        },
        {
          root: '交',
          count: 15
        },
        {
          root: '流',
          count: 15
        },
        {
          root: '通',
          count: 15
        },
        {
          root: '收',
          count: 15
        },
        {
          root: '观',
          count: 15
        },
        {
          root: '领',
          count: 15
        },
        {
          root: '～发',
          count: 14
        },
        {
          root: '实～',
          count: 14
        },
        {
          root: '正～',
          count: 14
        },
        {
          root: '～来',
          count: 14
        },
        {
          root: '过～',
          count: 14
        },
        {
          root: '～于',
          count: 14
        },
        {
          root: '小～',
          count: 14
        },
        {
          root: '保～',
          count: 14
        },
        {
          root: '～度',
          count: 14
        },
        {
          root: '好',
          count: 14
        },
        {
          root: '见',
          count: 14
        },
        {
          root: '期',
          count: 14
        },
        {
          root: '想',
          count: 14
        },
        {
          root: '工',
          count: 14
        },
        {
          root: '能',
          count: 14
        },
        {
          root: '水',
          count: 14
        },
        {
          root: '日',
          count: 14
        },
        {
          root: '外',
          count: 14
        },
        {
          root: '务',
          count: 14
        },
        {
          root: '～望',
          count: 14
        },
        {
          root: '调',
          count: 14
        },
        {
          root: '应',
          count: 14
        },
        {
          root: '目',
          count: 14
        },
        {
          root: '而',
          count: 14
        },
        {
          root: '失',
          count: 14
        },
        {
          root: '品',
          count: 14
        },
        {
          root: '～成',
          count: 13
        },
        {
          root: '～体',
          count: 13
        },
        {
          root: '时～',
          count: 13
        },
        {
          root: '作～',
          count: 13
        },
        {
          root: '当～',
          count: 13
        },
        {
          root: '可～',
          count: 13
        },
        {
          root: '文～',
          count: 13
        },
        {
          root: '相～',
          count: 13
        },
        {
          root: '～视',
          count: 13
        },
        {
          root: '关',
          count: 13
        },
        {
          root: '名',
          count: 13
        },
        {
          root: '中',
          count: 13
        },
        {
          root: '有',
          count: 13
        },
        {
          root: '前',
          count: 13
        },
        {
          root: '爱',
          count: 13
        },
        {
          root: '车',
          count: 13
        },
        {
          root: '服',
          count: 13
        },
        {
          root: '新',
          count: 13
        },
        {
          root: '间',
          count: 13
        },
        {
          root: '乐',
          count: 13
        },
        {
          root: '问',
          count: 13
        },
        {
          root: '进',
          count: 13
        },
        {
          root: '着',
          count: 13
        },
        {
          root: '复',
          count: 13
        },
        {
          root: '难',
          count: 13
        },
        {
          root: '照',
          count: 13
        },
        {
          root: '安',
          count: 13
        },
        {
          root: '性',
          count: 13
        },
        {
          root: '格',
          count: 13
        },
        {
          root: '导',
          count: 13
        },
        {
          root: '神',
          count: 13
        },
        {
          root: '～生',
          count: 12
        },
        {
          root: '动～',
          count: 12
        },
        {
          root: '～时',
          count: 12
        },
        {
          root: '～手',
          count: 12
        },
        {
          root: '～重',
          count: 12
        },
        {
          root: '～合',
          count: 12
        },
        {
          root: '～解',
          count: 12
        },
        {
          root: '～会',
          count: 12
        },
        {
          root: '报～',
          count: 12
        },
        {
          root: '以～',
          count: 12
        },
        {
          root: '～利',
          count: 12
        },
        {
          root: '精～',
          count: 12
        },
        {
          root: '表～',
          count: 12
        },
        {
          root: '空～',
          count: 12
        },
        {
          root: '～法',
          count: 12
        },
        {
          root: '～话',
          count: 12
        },
        {
          root: '～常',
          count: 12
        },
        {
          root: '指～',
          count: 12
        },
        {
          root: '提～',
          count: 12
        },
        {
          root: '是',
          count: 12
        },
        {
          root: '美',
          count: 12
        },
        {
          root: '国',
          count: 12
        },
        {
          root: '同',
          count: 12
        },
        {
          root: '电',
          count: 12
        },
        {
          root: '先',
          count: 12
        },
        {
          root: '备',
          count: 12
        },
        {
          root: '到',
          count: 12
        },
        {
          root: '告',
          count: 12
        },
        {
          root: '包',
          count: 12
        },
        {
          root: '放',
          count: 12
        },
        {
          root: '接',
          count: 12
        },
        {
          root: '位',
          count: 12
        },
        {
          root: '受',
          count: 12
        },
        {
          root: '断',
          count: 12
        },
        {
          root: '确',
          count: 12
        },
        {
          root: '示',
          count: 12
        },
        {
          root: '传',
          count: 12
        },
        {
          root: '密',
          count: 12
        },
        {
          root: '布',
          count: 12
        },
        {
          root: '气～',
          count: 11
        },
        {
          root: '体～',
          count: 11
        },
        {
          root: '事～',
          count: 11
        },
        {
          root: '～事',
          count: 11
        },
        {
          root: '方～',
          count: 11
        },
        {
          root: '手～',
          count: 11
        },
        {
          root: '合～',
          count: 11
        },
        {
          root: '～物',
          count: 11
        },
        {
          root: '风～',
          count: 11
        },
        {
          root: '经～',
          count: 11
        },
        {
          root: '～别',
          count: 11
        },
        {
          root: '结～',
          count: 11
        },
        {
          root: '干～',
          count: 11
        },
        {
          root: '～代',
          count: 11
        },
        {
          root: '～点',
          count: 11
        },
        {
          root: '感～',
          count: 11
        },
        {
          root: '高～',
          count: 11
        },
        {
          root: '～论',
          count: 11
        },
        {
          root: '～件',
          count: 11
        },
        {
          root: '周～',
          count: 11
        },
        {
          root: '～头',
          count: 11
        },
        {
          root: '～质',
          count: 11
        },
        {
          root: '商',
          count: 11
        },
        {
          root: '果',
          count: 11
        },
        {
          root: '足',
          count: 11
        },
        {
          root: '色',
          count: 11
        },
        {
          root: '思',
          count: 11
        },
        {
          root: '所',
          count: 11
        },
        {
          root: '场',
          count: 11
        },
        {
          root: '往',
          count: 11
        },
        {
          root: '急',
          count: 11
        },
        {
          root: '容',
          count: 11
        },
        {
          root: '清',
          count: 11
        },
        {
          root: '求',
          count: 11
        },
        {
          root: '除',
          count: 11
        },
        {
          root: '如',
          count: 11
        },
        {
          root: '向',
          count: 11
        },
        {
          root: '象',
          count: 11
        },
        {
          root: '原',
          count: 11
        },
        {
          root: '证',
          count: 11
        },
        {
          root: '消',
          count: 11
        },
        {
          root: '资',
          count: 11
        },
        {
          root: '任',
          count: 11
        },
        {
          root: '～量',
          count: 11
        },
        {
          root: '标',
          count: 11
        },
        {
          root: '支',
          count: 11
        },
        {
          root: '命',
          count: 11
        },
        {
          root: '预',
          count: 11
        },
        {
          root: '争',
          count: 11
        },
        {
          root: '民',
          count: 11
        },
        {
          root: '待',
          count: 11
        },
        {
          root: '固',
          count: 11
        },
        {
          root: '致',
          count: 11
        },
        {
          root: '字',
          count: 10
        },
        {
          root: '了',
          count: 10
        },
        {
          root: '说',
          count: 10
        },
        {
          root: '在',
          count: 10
        },
        {
          root: '热',
          count: 10
        },
        {
          root: '张',
          count: 10
        },
        {
          root: '认',
          count: 10
        },
        {
          root: '花',
          count: 10
        },
        {
          root: '步',
          count: 10
        },
        {
          root: '身',
          count: 10
        },
        {
          root: '真',
          count: 10
        },
        {
          root: '教',
          count: 10
        },
        {
          root: '比',
          count: 10
        },
        {
          root: '便',
          count: 10
        },
        {
          root: '算',
          count: 10
        },
        {
          root: '其',
          count: 10
        },
        {
          root: '总',
          count: 10
        },
        {
          root: '特',
          count: 10
        },
        {
          root: '差',
          count: 10
        },
        {
          root: '数',
          count: 10
        },
        {
          root: '护',
          count: 10
        },
        {
          root: '留',
          count: 10
        },
        {
          root: '活',
          count: 10
        },
        {
          root: '及',
          count: 10
        },
        {
          root: '式',
          count: 10
        },
        {
          root: '验',
          count: 10
        },
        {
          root: '严',
          count: 10
        },
        {
          root: '态',
          count: 10
        },
        {
          root: '程',
          count: 10
        },
        {
          root: '规',
          count: 10
        },
        {
          root: '言',
          count: 10
        },
        {
          root: '演',
          count: 10
        },
        {
          root: '推',
          count: 10
        },
        {
          root: '局',
          count: 10
        },
        {
          root: '转',
          count: 10
        },
        {
          root: '装',
          count: 10
        },
        {
          root: '充',
          count: 10
        },
        {
          root: '产',
          count: 10
        },
        {
          root: '势',
          count: 10
        },
        {
          root: '念',
          count: 10
        }
      ]
    }
  }
}
</script>
