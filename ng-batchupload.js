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
                controllerAs: '$budz',
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

                        this.manager  = settings.manager = this.buManager || batchUploadManager;
                        this.dropzone = new FileDropZone($element[0], settings);

                        if (!!this.buOnComplete) {
                            this.manager.on('complete', onComplete);
                        }

                        if (!!this.buOnError) {
                            this.manager.on('error', onError);
                        }

                        if (!!this.buOnFileStart) {
                            this.manager.on('file_start', onFileStart);
                        }

                        if (!!this.buOnStart) {
                            this.manager.on('start', onStart);
                        }

                        if (!!this.buOnPause) {
                            this.manager.on('pause', onPause);
                        }

                        if (!!this.buOnProgress) {
                            this.manager.on('progress', onProgress);
                        }

                        if (!!this.buOnInvalid) {
                            this.manager.on('invalid', onInvalid);
                        }

                        if (!!this.buOnQueue) {
                            this.manager.on('queue', onQueue);
                        }
                    };

                    this.$onDestroy = function() {
                        if (!this.manager) {
                            return;
                        }

                        if (!!this.buOnComplete) {
                            this.manager.off('complete', onComplete);
                        }

                        if (!!this.buOnError) {
                            this.manager.off('error', onError);
                        }

                        if (!!this.buOnFileStart) {
                            this.manager.off('file_start', onFileStart);
                        }

                        if (!!this.buOnStart) {
                            this.manager.off('start', onStart);
                        }

                        if (!!this.buOnPause) {
                            this.manager.off('pause', onPause);
                        }

                        if (!!this.buOnProgress) {
                            this.manager.off('progress', onProgress);
                        }

                        if (!!this.buOnInvalid) {
                            this.manager.off('invalid', onInvalid);
                        }

                        if (!!this.buOnQueue) {
                            this.manager.off('queue', onQueue);
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
                controllerAs: '$budialog',
                controller: ['batchUploadManager', '$document', '$element',
                    function(batchUploadManager, $document, $element) {
                    var ctrl     = this,
                        dialog   = $document[0].createElement('input'),
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

                        this.manager = this.buManager || batchUploadManager;

                        if (this.buUrl) {
                            this.manager.settings.url = this.buUrl
                        }

                        if (this.buMethod) {
                            this.manager.settings.method = this.buMethod;
                        }

                        if (this.buDragOverClass) {
                            this.dragOverClass = this.buDragOverClass;
                        }

                        if (this.buAllowedTypes) {
                            this.manager.settings.allowedTypes = this.buAllowedTypes.split(' ');
                        }

                        if (this.buAllowedExtentions) {
                            this.manager.settings.allowedExtensions = this.buAllowedExtensions.split(' ');
                        }

                        if (this.buMaxFileSize) {
                            this.manager.settings.maxFileSize = this.buMaxFileSize;
                        }

                        if (this.buMaxChunkSize) {
                            this.manager.settings.maxChunkSize = this.buMaxChunkSize;
                        }

                        if (this.buMaxQueue) {
                            this.manager.settings.maxQueue = this.buMaxQueue;
                        }

                        if (this.buFormFileField) {
                            this.manager.settings.formFileField = this.buFormFileField;
                        }

                        if (this.buChunkParameter) {
                            this.manager.settings.chunkParameter = this.buChunkParameter;
                        }

                        if (this.buChunksParameter) {
                            this.manager.settings.chunksParameter = this.buChunksParameter;
                        }

                        // Bind Events

                        if (!!this.buOnComplete) {
                            this.manager.on('complete', onComplete);
                        }

                        if (!!this.buOnError) {
                            this.manager.on('error', onError);
                        }

                        if (!!this.buOnFileStart) {
                            this.manager.on('file_start', onFileStart);
                        }

                        if (!!this.buOnStart) {
                            this.manager.on('start', onStart);
                        }

                        if (!!this.buOnPause) {
                            this.manager.on('pause', onPause);
                        }

                        if (!!this.buOnProgress) {
                            this.manager.on('progress', onProgress);
                        }

                        if (!!this.buOnInvalid) {
                            this.manager.on('invalid', onInvalid);
                        }

                        if (!!this.buOnQueue) {
                            this.manager.on('queue', onQueue);
                        }

                        dialog.setAttribute('type', 'file');
                        dialog.setAttribute('multiple', this.manager.maxQueue > 1);
                        dialog.addEventListener('change', function(event) {
                            ctrl.setFiles(event.target.files);
                            dialog.value = null;
                        });

                        $element.on('click', function(event) {
                            event.preventDefault();
                            dialog.click();
                        });
                    };

                    this.$onDestroy = function() {
                        if (!this.manager) {
                            return;
                        }

                        if (!!this.buOnComplete) {
                            this.manager.off('complete', onComplete);
                        }

                        if (!!this.buOnError) {
                            this.manager.off('error', onError);
                        }

                        if (!!this.buOnFileStart) {
                            this.manager.off('file_start', onFileStart);
                        }

                        if (!!this.buOnStart) {
                            this.manager.off('start', onStart);
                        }

                        if (!!this.buOnPause) {
                            this.manager.off('pause', onPause);
                        }

                        if (!!this.buOnProgress) {
                            this.manager.off('progress', onProgress);
                        }

                        if (!!this.buOnInvalid) {
                            this.manager.off('invalid', onInvalid);
                        }

                        if (!!this.buOnQueue) {
                            this.manager.off('queue', onQueue);
                        }

                        dialog = undefined;
                    };

                    this.setFiles = function(files) {
                        this.manager.setFiles(files);
                    }
                }]
            }
        }])
        ;