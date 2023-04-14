<template>
  <div class="page-outer">
    <breadcrumb-trail :breadcrumb="breadcrumb" :title="pageTitle" />
    <div class="container-default">
      <h1>Medical Resources</h1>
      <br>
      <p>
        EP1: We are working towards developing a clinical report pipeline aimed at improving diagnosis for the Pulmonary hypertension CTEPH group. The pipeline will provide:
        <ol>
          <li>New methods and figures display cardiopulmonary modelling and imaging outputs</li>
            <ol type="a">
              <li>Three dimensional visualisation of perfusion models of the lung</li>
              <li>Extent of distal remodelling</li>
              <li>Potential prediction of pulmonary endarterectomy surgical outcomes</li>
            </ol>
          <li>Novel combination of cardiopulmonary biomarkers</li>
        </ol>
      </p>
      <br>
      <p>
        P3: We have developed a range of technologies that provide a platform to enable small, deeply implanted medical devices.
        <ol>
          <li>Encapsulation methods to manufacture biocompatible, hermetic, long term packaging for small implants.</li>
          <li>Wireless power methods and models to safely provide power deep within the body.</li>
          <li>Wireless data transfer techniques to send physiological measurements out from deep within the body.</li>
          <li>Methods to combine and miniaturise electronics allowing tiny implantable devices to be manufactured.</li>
        </ol>
        These technologies have been demonstrated in our implantable pressure sensor and could be extended to a wide range of other measurement and stimulation implants.
      </p>
      <br><br>
      <p>
        EP3: We are using various research approaches to understanding the structure and function of smooth muscle in the gastrointestinal tract and uterus. These approaches include:
      <ol>
        <li>Experimental measurement of smooth muscle function, including electrophysiology and mechanical activation in the stomach and uterus</li>
        <li>Mathematical modelling of uterine smooth muscle cells:</li>
        <ol type="a">
          <li>Individual cell models encapsulating responses to hormonal stimuli such as oxytocin or electrical activity.</li>
          <li>Integration of smooth muscle cells with other cell types into tissue models. The uterus exhibits complex electrical activity triggered by unknown mechanisms that may be related to passive – non-excitable – cells surrounding the contractile smooth muscle cells.</li>
        </ol>
      </ol>
      We are also developing multicellular mathematical models of endometriosis, to try and understand the factors involved in the onset of the disease.
      </p>
    </div>
  </div>
</template>
  
<script>
  export default {
    name: "MedicalResources",
    data: () => {
      return {
        pageTitle: "Technical Resources",
        breadcrumb: [
          {
            to: { name: "index" },
            label: "Home",
          },
          {
            to: { name: "resources" },
            label: "Resources",
          },
        ],
      }
    }
  }
</script>

<style scoped lang="scss">
// 
</style>