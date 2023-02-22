/**
 * eslint-disable @sap/ui5-jsdocs/no-jsdoc
 */
// 어플리케이션에 대한 정보는 대부분 ㅁmanifest에 저장하는것으로 바뀜
//ui5 어플리케이션에 대한 정보(어플리케이션의 모든 정보를 캡슐화함) 독립적이고 재사용가능한 부분.

sap.ui.define([
        "sap/ui/core/UIComponent",
        "sap/ui/Device",
        "project3/model/models"
    ],
    function (UIComponent, Device, models) {
        "use strict";

        return UIComponent.extend("project3.Component", {
            metadata: {
                manifest: "json"
            },

            /**
             * The component is initialized by UI5 automatically during the startup of the app and calls the init method once.
             * @public
             * @override
             */
            init: function () {
                // call the base component's init function
                UIComponent.prototype.init.apply(this, arguments);

                // enable routing
                this.getRouter().initialize();

                // set the device model
                this.setModel(models.createDeviceModel(), "device");
            }
        });
    }
);