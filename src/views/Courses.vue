<template>
  <div class="container mt-5 mb-5">
    <div class="row">
      <div class="col-sm-12">
        <h1 class="mb-5 text-center">
          Courses that take your Chinese to the next level.
        </h1>
      </div>
    </div>
    <div class="row">
      <div class="col-sm-12">
        <div class="jumbotron text-center courses">
          <div class="container mb-3">
            <div class="row">
              <div
                class="col-sm-6 col-md-4 mb-3"
                v-for="hsk in [1, 2, 3, 4, 5, 6]"
              >
                <a
                  :href="
                    `https://courses.chinesezerotohero.com/p/hsk-${hsk}-course`
                  "
                  ><img
                    :src="`/img/courses/hsk${hsk}.jpg`"
                    :alt="`HSK ${hsk} Course`"
                    class="img-fluid shadow rounded"
                    target="_blank"/>
                  <h5 class="mt-2">
                    HSK {{ hsk }} Course
                    <font-awesome-icon
                      icon="external-link-alt"
                      class="small ml-1"
                    /></h5
                ></a>
              </div>
              <div class="col-sm-6 col-md-4 mb-3">
                <a
                  :href="
                    `https://chinesezerotohero.teachable.com/p/path-to-fluency`
                  "
                  ><img
                    :src="`/img/courses/fluency.jpg`"
                    alt="Path to Fluency Course"
                    class="img-fluid shadow rounded"
                    target="_blank"/>
                  <h5 class="mt-2">
                    Path to Fluency
                    <font-awesome-icon
                      icon="external-link-alt"
                      class="small ml-1"
                    /></h5
                ></a>
              </div>
              <div class="col-sm-6 col-md-4 mb-3">
                <a
                  :href="
                    `https://chinesezerotohero.teachable.com/p/phonetics-with-chinese-characteristics`
                  "
                  ><img
                    :src="`/img/courses/phonetics.jpg`"
                    alt="Phonetics with Chinese Characteristics"
                    class="img-fluid shadow rounded"
                    target="_blank"/>
                  <h5 class="mt-2">
                    Phonetics with Chinese Characteristics
                    <font-awesome-icon
                      icon="external-link-alt"
                      class="small ml-1"
                    /></h5
                ></a>
              </div>
            </div>
          </div>
          <a
            href="https://chinesezerotohero.teachable.com/"
            class="btn btn-success view-courses pb-1 bigger"
            target="_blank"
            >View all of our courses on
            <img
              src="/img/teachable_light.png"
              alt="Teachable"
              class="logo-small mb-1"
            />
          </a>
          <p class="mt-3">
            <b>Teachable</b> is an online platform that hosts video courses.
          </p>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-sm-6">
        <h3 class="mb-3">What makes our courses different?</h3>
        <h5>Functional</h5>
        <p>
          You learn a language so you can do things with it – to accomplish
          real-world tasks, or functions. From day 1, we focus on enabling
          students to “do something” with what they learn, and design our
          lessons around that objective. We try to steer around overuse of
          unecessary jargons and lengthy explanations and focus on practical
          applications.
        </p>
        <h5>Engaging</h5>
        <p>
          <strong
            >Learning is hard work, but it should never be boring, so we
            designed our courses to be concise yet fun and engaging.</strong
          >
          &nbsp;We use instruction design principles proposed by
          <a
            href="https://en.wikipedia.org/wiki/Robert_M._Gagn%C3%A9"
            target="_blank"
            >Robert M. Gagné</a
          >, as well as multimedia learning guidelines by
          <a
            href="https://en.wikipedia.org/wiki/Richard_E._Mayer"
            target="_blank"
            >Richard E. Mayer</a
          >.&nbsp; The instructional designs are so successful that we have
          received many raving reviews from our students.
        </p>
        <h5>Communicative</h5>
        <p class="">
          <strong
            >All of our
            <a href="https://courses.chinesezerotohero.com/courses/">courses</a>
            focus on communication and function</strong
          >. &nbsp;We strive to help students use the language by providing
          plenty of practice, both written and oral. &nbsp;We help and encourage
          students to practice with a language exchange partner via sites such
          as <a href="https://www.italki.com/">iTalki</a>.&nbsp; This way
          students learn to use the language in real life, not just to pass
          tests.
        </p>
        <h5>Standardized</h5>
        <p class="">
          <strong>All of our courses use the standardized HSK curriculum</strong
          >. &nbsp;When you complete a course, you will be able to pass the HSK
          test for that level so you can measure your progress and prove your
          ability.&nbsp; Carefully designed lessons following a well established
          program delivers real, measurable results. All courses follow the
          <strong>HSK Standard Course textbook by Jiang Liping.</strong>
        </p>
      </div>
      <div class="col-sm-6">
        <h3>Achieve fluent communication and outstanding HSK results.</h3>
        <p>
          A question commonly posed is, why do you have one of the best-selling
          HSK courses on the web? The answers lie in the instructional
          philosophy behind our courses. This page outlines some of the
          important differences between our courses and other learning products
          commonly found on the web.
        </p>
        <p>
          First of all, our courses aim to form a
          <strong>complete</strong> suit with <strong>progressive</strong> and
          <strong>interconnecting units</strong>. Rather than littering the
          collection with disjointed one-shot lessons, our material forms a
          complete whole – a series of step-by-step video-based instructional
          units that take a beginner beyond the highest level, progressing from
          HSK level 1 all the way through HSK level 6 and beyond. Such an
          integrated approach reassures the students that once they sign up with
          us they will be shown a clear path to success, thus saving them
          considerable amount of time and uncertainty.
        </p>
        <p>
          Granted, to be successful in acquiring Chinese as a second language, a
          learners need much more than a set of courses. They must be willing to
          make use of a variety of resources and expose themselves to large
          amounts of the target language through reading and listening.<span
            data-offset-key="e61re-0-0"
            >Nevertheless, our courses can form the </span
          ><span data-offset-key="e61re-0-1">“<strong>backbone</strong>“</span
          ><span data-offset-key="e61re-0-2">
            of their learning, providing the structure students can base their
            learning on. </span
          >&nbsp;Learners will find unparalleled success if they take our
          courses in conjunction with the vast array of learning options out
          there.
        </p>
        <p>
          Second, our courses put the spotlight on what many students struggle
          with – <strong>grammar</strong>. Without proper knowledge of grammar,
          learners cannot accurately understand what they read or hear. In this
          regard, dictionaries are not particularly helpful because they do not
          explain sentence formation, at least not in a way that is clear to
          students at varying levels. Learning sentence formation is especially
          critical at the beginning stages where learners are utterly oblivious
          of even the most basic sentence patterns. As a result, many learners
          often resort to “guessing” by applying English grammar to Chinese
          sentences and misconstrue their meaning.&nbsp;<span
            >Therefore, to learn Chinese effectively, grammar instruction cannot
            be overlooked.</span
          >
        </p>
        <p>
          <span
            >Some resist the idea of explicitly learning grammar in favor of a
            more natural, input-based approach. We agree to this assertion to
            some extent because the nuances of Chinese grammar simply cannot be
            taught with explicit instruction alone. Nevertheless, input is only
            meaningful if they are understood. If learners are never taught
            grammar, how can they possibly understand sentences correctly? It is
            obvious, therefore, that some grammar must be made familiar to the
            students, especially at the beginning stages. Our grammar
            instruction strives to be&nbsp;</span
          ><strong class="s570a4-14 kYTLgH"
            >simple and clear with ample examples&nbsp;</strong
          ><span
            >so that the learners can form sentences correctly without being
            unduly concerned with jargons and terms.</span
          >
        </p>
        <p>
          In short,
          <strong
            >curricular completeness and clear, step-by-step grammar
            instruction</strong
          >
          distinguishes us from most learning products out there. We hope these
          courses offer a meaningful contribution to the Chinese learning
          community.
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style scoped>
.courses a:not(.btn) {
  color: inherit;
}

.courses a:hover {
  text-decoration: none;
}
</style>
