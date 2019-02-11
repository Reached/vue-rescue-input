(function() {
  try {
    const Vue = require('vue');
  } catch (e) {
    console.warn('Vue is not available or not initialized correctly.')
  }

  function findByName(data, name) {
    let result;

    function iter(a) {
      if (a.name === name) {
        result = a;
        return true;
      }
      return Array.isArray(a.children) && a.children.some(iter);
    }

    data.some(iter);
    return result;
  }

  const saveInput = Vue.directive('rescue-input', {
    bind(el, binding, vnode) {
      let vModel = getVModelName(vnode);

      // Get the name of the v-model
      function getVModelName(vnode) {
        return findByName(vnode.data.directives, 'model');
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
