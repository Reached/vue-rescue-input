(function() {
  try {
    var Vue = require('vue');
  } catch (e) {
    // It's all good, Vue should already be available globally.
  }
  // Then create your Vue.directive as a variable:
  var saveInput = Vue.directive('rescue-input', {
    bind: function(el, binding, vnode) {
      let vModel = getVModelName(vnode);

      // Get the name of the v-model
      function getVModelName(vnode) {
        return vnode.data.directives.find(function(o) { //Search the vModelName attached to the element
          return o.name === 'model';
        }).expression;
      }

      // Set the v-model value
      function setVModelValue(value, vnode) {
        vnode.context[getVModelName(vnode)] = value;
      }

      // Save the new model value
      function saveModel(vModel, value, context) {
        window.localStorage.setItem(vModel, value);
        setVModelValue(value, context);
      }


      // Delete the model and the value
      function deleteModel(vModel) {
        window.localStorage.removeItem(vModel);
      }

      // Create a reusable function to handle the input blur event
      function handleEvents() {
        el.addEventListener('blur', function() {

          saveModel(vModel, el.value, vnode);

          if (el.value === '') {
            deleteModel(vModel);
          }

        });
      }

      // If the input value is empty and there hasnt been set anything via LS
      if (el.value === '' && window.localStorage.getItem(vModel) === null) {
        handleEvents();
      } else {
        handleEvents();

        // Set the v-model value to the saved value
        if (el.value === '') {
            setVModelValue(window.localStorage.getItem(vModel), vnode);
        }
      }

    }
  });

  try {

    module.exports = saveInput;

  } catch (e) {

  }
})();
