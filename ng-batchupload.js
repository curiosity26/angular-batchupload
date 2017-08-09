angular.module('batchUpload', [])
        .provider('batchUploadManager', function() {
            var self = this;
            this.settings = angular.extend({}, FileUploadManager.DEFAULT);

            this.setSettings = function(settings) {
                this.settings = angular.extend({}, settings, FileUploadManager.DEFAULT)
            };

            this.setUrl = function(url) {
                this.settings.url = url;
            };

            this.$get = function() {
                return new FileUploadManager(self.settings);
            };
        })
        .provider('batchDropZone', function() {
            var self = this;

            this.settings = angular.extend({}, FileDropZone.DEFAULT);

            this.setSettings = function(settings) {
                this.settings = angular.extend({}, settings, FileDropZone.DEFAULT)
            };

            this.$get = ['batchUploadManager', function(batchUploadManager) {
                self.settings.manager = batchUploadManager;
                return function (element) {
                    return new FileDropZone(!!element.length ? element[0] : element, self.settings);
                };
            }];
        })
        .directive('buDropZone', [function() {
            return {
                restrict: 'AEC',
                scope: {
                    buManager: '=?',
                    buOnError: '&?',
                    buOnQueue: '&?',
                    buOnComplete: '&?',
                    buOnInvalid: '&?',
                    buOnStart: '&?',
                    buOnPause: '&?',
                    buOnProgress: '&?',
                    buOnFileStart: '&?',
                    buUrl: '@?',
                    buMethod: '@?',
                    buDragOverClass: '@?',
                    buAllowedTypes: '@?',
                    buAllowedExtentions: '@?',
                    buMaxFileSize: '@?',
                    buMaxChunkSize: '@?',
                    buMaxQueue: '@?',
                    buFormFileField: '@?',
                    buChunkParameter: '@?',
                    buChunksParameter: '@?'
                },
                bindToController: true,
                controller: ['$element', function($element) {
                    var settings = {};

                    this.$onInit = function() {

                        if (this.buUrl) {
                            settings.url = this.buUrl
                        }

                        if (this.buMethod) {
                            settings.method = this.buMethod;
                        }

                        if (this.buDragOverClass) {
                            settings.dragOverClass = this.buDragOverClass;
                        }

                        if (this.buAllowedTypes) {
                            settings.allowedTypes = this.buAllowedTypes.split(' ');
                        }

                        if (this.buAllowedExtentions) {
                            settings.allowedExtensions = this.buAllowedExtensions.split(' ');
                        }

                        if (this.buMaxFileSize) {
                            settings.maxFileSize = this.buMaxFileSize;
                        }

                        if (this.buMaxChunkSize) {
                            settings.maxChunkSize = this.buMaxChunkSize;
                        }

                        if (this.buMaxQueue) {
                            settings.maxQueue = this.buMaxQueue;
                        }

                        if (this.buFormFileField) {
                            settings.formFileField = this.buFormFileField;
                        }

                        if (this.buChunkParameter) {
                            settings.chunkParameter = this.buChunkParameter;
                        }

                        if (this.buChunksParameter) {
                            settings.chunksParameter = this.buChunksParameter;
                        }

                        settings.manager = this.buManager || null;

                        this.dropzone = new FileDropZone($element[0], settings);

                        if (!!this.buOnComplete) {
                            this.dropzone.on('complete', this.buOnComplete);
                        }

                        if (!!this.buOnError) {
                            this.dropzone.on('error', this.buOnError);
                        }

                        if (!!this.buOnFileStart) {
                            this.dropzone.on('file_start', this.buOnFileStart);
                        }

                        if (!!this.buOnStart) {
                            this.dropzone.on('start', this.buOnStart);
                        }

                        if (!!this.buOnPause) {
                            this.dropzone.on('pause', this.buOnPause);
                        }

                        if (!!this.buOnProgress) {
                            this.dropzone.on('progress', this.buOnProgress);
                        }

                        if (!!this.buOnInvalid) {
                            this.dropzone.on('invalud', this.buOnInvalid);
                        }

                        if (!!this.buOnQueue) {
                            this.dropzone.on('queue', this.buOnQueue);
                        }
                    };

                    this.$onDestroy = function() {
                        if (!!this.buOnComplete) {
                            this.dropzone.off('complete', this.buOnComplete);
                        }

                        if (!!this.buOnError) {
                            this.dropzone.off('error', this.buOnError);
                        }

                        if (!!this.buOnFileStart) {
                            this.dropzone.off('file_start', this.buOnFileStart);
                        }

                        if (!!this.buOnStart) {
                            this.dropzone.off('start', this.buOnStart);
                        }

                        if (!!this.buOnPause) {
                            this.dropzone.off('pause', this.buOnPause);
                        }

                        if (!!this.buOnProgress) {
                            this.dropzone.off('progress', this.buOnProgress);
                        }

                        if (!!this.buOnInvalid) {
                            this.dropzone.off('invalud', this.buOnInvalid);
                        }

                        if (!!this.buOnQueue) {
                            this.dropzone.off('queue', this.buOnQueue);
                        }
                    };
                }],
                link: function(scope, element, attr) {
                    element.addClass('file-drop-zone');
                }
            }
        }])
        .directive('buDialog', ['batchUploadManager', function(batchUploadManager) {
            return {
                restrict: 'AEC',
                link: function(scope, element, attr) {
                    if (attr['buUrl']) {
                        batchUploadManager.settings.url = attr['buUrl'];
                    }

                    if (attr['buMethod']) {
                        batchUploadManager.method = attr['buMethod'];
                    }

                    if (attr['buAllowedTypes']) {
                        batchUploadManager.allowedTypes = attr['buAllowedTypes'].split(' ');
                    }

                    if (attr['buAllowedExtentions']) {
                        batchUploadManager.allowedExtensions = attr['buAllowedExtensions'].split(' ');
                    }

                    if (attr['buMaxFileSize']) {
                        batchUploadManager.maxFileSize = attr['buMaxFileSize'];
                    }

                    if (attr['buMaxChunkSize']) {
                        batchUploadManager.maxChunkSize = attr['buMaxChunkSize'];
                    }

                    if (attr['buMaxQueue']) {
                        batchUploadManager.maxQueue = attr['buMaxQueue'];
                    }

                    if (attr['buFormFileField']) {
                        batchUploadManager.formFileField = attr['buFormFileField'];
                    }

                    if (attr['buChunkParameter']) {
                        batchUploadManager.chunkParameter = attr['buChunkParameter'];
                    }

                    if (attr['buChunksParameter']) {
                        batchUploadManager.chunksParameter = attr['buChunksParameter'];
                    }

                    var dialog = document.createElement('input');
                    dialog.setAttribute('type', 'file');
                    dialog.setAttribute('multiple', batchUploadManager.settings.maxQueue > 1);
                    dialog.addEventListener('change', function(event) {
                        batchUploadManager.setFiles(event.target.files);
                        dialog.value = null;
                    });

                    element.on('click', function(event) {
                        event.preventDefault();
                        dialog.click();
                    });
                }
            }
        }])
        ;