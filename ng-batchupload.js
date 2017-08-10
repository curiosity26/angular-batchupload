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
                controller: ['$element', 'batchUploadManager', function($element, batchUploadManager) {
                    var settings = {},
                        ctrl     = this,
                        onComplete = function(e) {
                            ctrl.buOnComplete({$event: e});
                        },
                        onError = function(e) {
                            ctrl.buOnError({$event: e});
                        },
                        onFileStart = function(e) {
                            ctrl.buOnFileStart({$event: e});
                        },
                        onStart = function(e) {
                            ctrl.buOnStart({$event: e});
                        },
                        onPause = function(e) {
                            ctrl.buOnPause({$event: e});
                        },
                        onProgress = function(e) {
                            ctrl.buOnProgress({$event: e});
                        },
                        onInvalid = function(e) {
                            ctrl.buOnInvalid({$event: e});
                        },
                        onQueue = function(e) {
                            ctrl.buOnQueue({$event: e});
                        }
                    ;

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

                        settings.manager = this.buManager || batchUploadManager;

                        this.dropzone = new FileDropZone($element[0], settings);

                        if (!!this.buOnComplete) {
                            settings.manager.on('complete', onComplete);
                        }

                        if (!!this.buOnError) {
                            settings.manager.on('error', onError);
                        }

                        if (!!this.buOnFileStart) {
                            settings.manager.on('file_start', onFileStart);
                        }

                        if (!!this.buOnStart) {
                            settings.manager.on('start', onStart);
                        }

                        if (!!this.buOnPause) {
                            settings.manager.on('pause', onPause);
                        }

                        if (!!this.buOnProgress) {
                            settings.manager.on('progress', onProgress);
                        }

                        if (!!this.buOnInvalid) {
                            settings.manager.on('invalud', onInvalid);
                        }

                        if (!!this.buOnQueue) {
                            settings.manager.on('queue', onQueue);
                        }
                    };

                    this.$onDestroy = function() {
                        if (!!this.buOnComplete) {
                            settings.manager.off('complete', onComplete);
                        }

                        if (!!this.buOnError) {
                            settings.manager.off('error', onError);
                        }

                        if (!!this.buOnFileStart) {
                            settings.manager.off('file_start', onFileStart);
                        }

                        if (!!this.buOnStart) {
                            settings.manager.off('start', onStart);
                        }

                        if (!!this.buOnPause) {
                            settings.manager.off('pause', onPause);
                        }

                        if (!!this.buOnProgress) {
                            settings.manager.off('progress', onProgress);
                        }

                        if (!!this.buOnInvalid) {
                            settings.manager.off('invalud', onInvalid);
                        }

                        if (!!this.buOnQueue) {
                            settings.manager.off('queue', onQueue);
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