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
        .directive('buDropZone', ["batchDropZone", function(batchDropZone) {
            return {
                restrict: 'AEC',
                link: function(scope, element, attr) {
                    element.dropzone = batchDropZone(element);
                    element.addClass('file-drop-zone');

                    if (attr['buUrl']) {
                        element.dropzone.settings.manager.settings.url =
                                element.dropzone.settings.url = attr['buUrl'];
                    }

                    if (attr['buMethod']) {
                        element.dropzone.settings.manager.settings.method =
                                element.dropzone.settings.method = attr['buMethod'];
                    }

                    if (attr['buDragOverClass']) {
                        element.dropzone.settings.dragOverClass = attr['buDragOverClass'];
                    }

                    if (attr['buAllowedTypes']) {
                        element.dropzone.settings.manager.settings.allowedTypes =
                                element.dropzone.settings.allowedTypes = attr['buAllowedTypes'].split(' ');
                    }

                    if (attr['buAllowedExtentions']) {
                        element.dropzone.settings.manager.settings.allowedExtensions =
                                element.dropzone.settings.allowedExtensions = attr['buAllowedExtensions'].split(' ');
                    }

                    if (attr['buMaxFileSize']) {
                        element.dropzone.settings.manager.settings.maxFileSize =
                            element.dropzone.settings.maxFileSize = attr['buMaxFileSize'];
                    }

                    if (attr['buMaxChunkSize']) {
                        element.dropzone.settings.manager.settings.maxChunkSize =
                                element.dropzone.settings.maxChunkSize = attr['buMaxChunkSize'];
                    }

                    if (attr['buMaxQueue']) {
                        element.dropzone.settings.manager.maxQueue =
                                element.dropzone.settings.maxQueue = attr['buMaxQueue'];
                    }

                    if (attr['buFormFileField']) {
                        element.dropzone.settings.manager.settings.formFileField =
                                element.dropzone.settings.formFileField = attr['buFormFileField'];
                    }

                    if (attr['buChunkParameter']) {
                        element.dropzone.settings.manager.settings.chunkParameter =
                                element.dropzone.settings.chunkParameter = attr['buChunkParameter'];
                    }

                    if (attr['buChunksParameter']) {
                        element.dropzone.settings.manager.settings.chunksParameter =
                                element.dropzone.settings.chunksParameter = attr['buChunksParameter'];
                    }
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
                    dialog.setAttribute('multiple', true);
                    dialog.addEventListener('change', function(event) {
                        batchUploadManager.setFiles(event.target.files);
                    });

                    element.on('click', function(event) {
                        event.preventDefault();
                        dialog.click();
                    });
                }
            }
        }])
        ;