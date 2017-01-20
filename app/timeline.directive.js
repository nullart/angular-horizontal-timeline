/**
 * Created by luoxiao on 2017/1/20.
 */
angular.module('app')
    .directive('timeLine', function ($timeout) {
        return {
            restrict: 'A',
            link: function (scope, element, attrs) {

                //angular.element(element).css('border', '5px solid red');
                scope.$on('LastElem', function (event) {

                    var timelines = element;
                    eventsMinDistance = timelines.data('spacing');
                    var timeline = timelines,
                        timelineComponents = {};
                    //cache timeline components
                    timelineComponents['timelineWrapper'] = timeline.find('.events-wrapper');
                    timelineComponents['eventsWrapper'] = timelineComponents['timelineWrapper'].children('.events');
                    timelineComponents['fillingLine'] = timelineComponents['eventsWrapper'].children('.filling-line');
                    timelineComponents['timelineEvents'] = timelineComponents['eventsWrapper'].find('a');
                    //timelineComponents['timelineDates'] = parseDate(scope.nodes);
                    timelineComponents['timelineDates'] = parseDate(timelineComponents['timelineEvents']);
                    timelineComponents['eventsMinLapse'] = minLapse(timelineComponents['timelineDates']);
                    timelineComponents['timelineNavigation'] = timeline.find('.cd-timeline-navigation');
                    timelineComponents['eventsContent'] = timeline.children('.events-content');


                    //assign a left postion to the single events along the timeline
                    setDatePosition(timelineComponents, eventsMinDistance);


                    //assign a width to the timeline
                    var timelineTotWidth = setTimelineWidth(timelineComponents, eventsMinDistance);
                    //the timeline has been initialize - show it
                    timeline.addClass('loaded');
                    scope.$watch(
                        // This function returns the value being watched. It is called for each turn of the $digest loop
                        function () {
                            return scope.nodes.length;
                        },
                        // This is the change listener, called when the value returned from the above function changes
                        function (newValue, oldValue) {
                            if (newValue !== oldValue) {
                                console.log('change');
                                $timeout(function () {
                                    timelineComponents['timelineWrapper'] = timeline.find('.events-wrapper');
                                    timelineComponents['eventsWrapper'] = timelineComponents['timelineWrapper'].children('.events');
                                    timelineComponents['fillingLine'] = timelineComponents['eventsWrapper'].children('.filling-line');
                                    timelineComponents['timelineEvents'] = timelineComponents['eventsWrapper'].find('a');
                                    timelineComponents['timelineDates'] = parseDate(timelineComponents['timelineEvents']);
                                    timelineComponents['eventsMinLapse'] = minLapse(timelineComponents['timelineDates']);
                                    timelineComponents['timelineNavigation'] = timeline.find('.cd-timeline-navigation');
                                    timelineComponents['eventsContent'] = timeline.children('.events-content');
                                    setDatePosition(timelineComponents, eventsMinDistance);
                                    timelineTotWidth = setTimelineWidth(timelineComponents, eventsMinDistance);
                                });

                                // Only increment the counter if the value changed
                                //scope.foodCounter = scope.foodCounter + 1;
                            }
                        }
                    );

                    //detect click on the next arrow
                    timelineComponents['timelineNavigation'].on('click', '.next', function (event) {
                        event.preventDefault();
                        updateSlide(timelineComponents, timelineTotWidth, 'next');
                    });
                    //detect click on the prev arrow
                    timelineComponents['timelineNavigation'].on('click', '.prev', function (event) {
                        event.preventDefault();
                        updateSlide(timelineComponents, timelineTotWidth, 'prev');
                    });
                    //detect click on the a single event - show new event content
                    timelineComponents['eventsWrapper'].on('click', 'a', function (event) {
                        event.preventDefault();
                        timelineComponents['timelineEvents'].removeClass('selected');
                        $(this).addClass('selected');
                        updateOlderEvents($(this));
                        updateFilling($(this), timelineComponents['fillingLine'], timelineTotWidth);
                        updateVisibleContent($(this), timelineComponents['eventsContent']);
                    });


                    //on swipe, show next/prev event content
                    timelineComponents['eventsContent'].on('swipeleft', function () {
                        var mq = checkMQ();
                        ( mq == 'mobile' ) && showNewContent(timelineComponents, timelineTotWidth, 'next');
                    });
                    timelineComponents['eventsContent'].on('swiperight', function () {
                        var mq = checkMQ();
                        ( mq == 'mobile' ) && showNewContent(timelineComponents, timelineTotWidth, 'prev');
                    });

                    //keyboard navigation
                    $(document).keyup(function (event) {
                        if (event.which == '37' && elementInViewport(timeline.get(0))) {
                            showNewContent(timelineComponents, timelineTotWidth, 'prev');
                        } else if (event.which == '39' && elementInViewport(timeline.get(0))) {
                            showNewContent(timelineComponents, timelineTotWidth, 'next');
                        }
                    });


                });
            }

        }
    })
    .directive('timeLineLi', function ($timeout) {
        return {
            restrict: 'A',
            link: function (scope, element, attrs) {
                console.dir(scope);
                if (scope.$last) {
                    $timeout(function () {
                        scope.$emit('LastElem');
                    });
                }
                //scope.$watch('thing', function () {
                //    var r = (Math.random() * 255).toFixed(0);
                //    var g = (Math.random() * 255).toFixed(0);
                //    var b = (Math.random() * 255).toFixed(0);
                //    angular.element(element).css('color', 'rgb(' + r + ',' + g + ',' + b + ')');
                //});
            }

        }
    })
