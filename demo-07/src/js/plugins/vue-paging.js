;(function($, window, document, undefined) {
	var pluginName = 'paging';
	var	defaultOpts = {
		mode: 'ellipsis',                   //ellipsis || clip
		edges: 2,
		ellipsisText: '&hellip;',
		pageNo: 1,							 //当前页
		pageSize: 20,						 //每页记录数
		totalRecords: 0,					 //总记录数
		displayPages: 5,					 //一次显示分页按钮数	
		wrapCls: 'paging-default',      	 //外面包裹层class
		isShowFirstPageBtn: true, 			 //是否显示首页按钮
		isShowLastPageBtn: true,  			 //是否显示尾页按钮
		isShowPrevPageBtn: true,             //是否显示上一页按钮
		isShowNextPageBtn: true,             //是否显示下一页按钮
		isShowCurrPage: true,                //是否显示当前页
		isShowTotalPages: true,              //是否显示总页数
		isShowPageSize: true,                //是否显示每页记录数
		isShowTotalRecords: true,            //是否显示总记录数
		isWrapedPageBtns: true,              //是否用span包裹住分页按钮
		isWrapedInfo: true,                  //是否用span包裹住分页信息		
		onPageBtnClick: function(event, pageNo, pageSize){
			
		},
		lang: {
			firstPageText: '首页',
			firstPageTipText: '首页',
			lastPageText: '尾页',
			lastPageTipText: '尾页',
			prevPageText: '上一页',
			prevPageTipText: '上一页',
			nextPageText: '下一页',
			nextPageTipText: '下一页',
			currPageBeforeText: '当前第',
			currPageAfterText: '页',
			totalPagesBeforeText: '共',
			totalPagesAfterText: '页',
			pageSizeBeforeText: '每页',
			pageSizeAfterText: '条',
			totalRecordsBeforeText: '共',
			totalRecordsAfterText: '条数据',
			pageInfoSplit: '/',
			recordInfoSplit: ',',
			pageRecordSplit: '&nbsp;'
		}
	};

	var methods = {
		init: function(options) {
			var me = this;
			var opts = $.extend(true, {}, defaultOpts, options || {});
			opts.pageNo = isNaN(opts.pageNo) ? 1 : parseInt(opts.pageNo);
			opts.totalPages = methods._getTotalPages(opts);
			opts.hasPrev = (opts.pageNo > 1);
			opts.hasNext = (opts.pageNo < opts.totalPages);
			if(opts.totalPages == 0 || opts.totalPages == 1) {
				opts.isShowTotalPages = true;
				opts.isShowTotalRecords = true;
				opts.isShowCurrPage = false;
				opts.isShowPageSize = false;
				opts.lang.pageRecordSplit = '/';
			}
			me.data('pagingOpts', opts);
			methods.generPagingHtml.call(this);
			methods.initEvents.call(this);
			return me;
		},
		destroy: function() {
			this.empty();
			return this;
		},
		initEvents: function() {
			var me = this;
			var opts = me.data('pagingOpts');
			me.delegate('a', 'click', function(event) {
				var pageNo = $(this).data('index');
				var pageSize = me.find('.pageSize').val() || opts.pageSize;
				opts.onPageBtnClick(event, pageNo, pageSize);
			});
			me.delegate('.currPageNo', 'keypress', function(event) {
				var code = event.keyCode || event.charCode;
				if(code == 13) {
					var pageNo = me.find('.currPageNo').val() || opts.pageNo;
					var pageSize = me.find('.pageSize').val() || opts.pageSize;
					opts.onPageBtnClick(event, pageNo, pageSize);
				}
			});
			me.delegate('.pageSize', 'keypress', function(event) {
				var code = event.keyCode || event.charCode;
				if(code == 13) {
					var pageNo = 1;
					var pageSize = me.find('.pageSize').val() || opts.pageSize;
					opts.onPageBtnClick(event, pageNo, pageSize);
				}
			});
			me.delegate('.currPageNo, .pageSize', 'focus', function(event) {
				$(this).addClass('focus');
			});
			me.delegate('.currPageNo, .pageSize', 'blur', function(event) {
				$(this).removeClass('focus');
			});
		},
		generPagingHtml: function() {
			var opts = this.data('pagingOpts');
			methods.destroy.call(this);

			var str_first = '', str_prev = '', str_next = '', str_last = '';
			if(opts.isShowFirstPageBtn) {
				if(opts.hasPrev) {
					str_first = '<a data-index="1" title="' + (opts.lang.firstPageTipText || opts.lang.firstPageText) + '">' + opts.lang.firstPageText + '</a>';
				}
			}

			if(opts.isShowPrevPageBtn) {
				if(opts.hasPrev) {
					str_prev = '<a data-index="'+ (opts.pageNo - 1) +'" title="' + (opts.lang.prevPageTipText || opts.lang.prevPageText) + '">' + opts.lang.prevPageText + '</a>';
				}
			}

			if(opts.isShowNextPageBtn) {
				if(opts.hasNext) {
					str_next = '<a data-index="'+ (opts.pageNo + 1) +'" title="' + (opts.lang.nextPageTipText || opts.lang.nextPageText) + '">' + opts.lang.nextPageText + '</a>';
				}
			}

			if(opts.isShowLastPageBtn) {
				if(opts.hasNext) {
					str_last = '<a data-index="'+ opts.totalPages +'" title="' + (opts.lang.lastPageTipText || opts.lang.lastPageText) + '">' + opts.lang.lastPageText + '</a>';
				}
			}
			
			var str_info = '<span class="info">';
			var page_info_split = '<span class="pageSplit">' + opts.lang.pageInfoSplit + '</span>';
			var record_info_split = '<span class="recordSplit">' + opts.lang.recordInfoSplit + '</span>';
			var page_record_split = '<span class="pageRecordSplit">' + opts.lang.pageRecordSplit + '</span>';
			if(opts.isShowCurrPage) {
				str_info += opts.lang.currPageBeforeText + '<input class="currPageNo" value="'+ opts.pageNo +'"/>' + opts.lang.currPageAfterText;
			}
			if(opts.isShowCurrPage && opts.isShowTotalPages) {
				str_info += page_info_split;
			}
			if(opts.isShowTotalPages) {
				str_info += opts.lang.totalPagesBeforeText + '<span class="totalpageNo">' + opts.totalPages + '</span>' + opts.lang.totalPagesAfterText;
			}
			if((opts.isShowCurrPage || opts.isShowTotalPages) && (opts.isShowPageSize || opts.isShowTotalRecords)) {
				str_info += page_record_split;
			}
			if(opts.isShowPageSize) {
				str_info += opts.lang.pageSizeBeforeText + '<input class="pageSize" value="' + opts.pageSize + '"/>' + opts.lang.pageSizeAfterText;
			}
			if(opts.isShowPageSize && opts.isShowTotalRecords) {
				str_info += record_info_split;
			}
			if(opts.isShowTotalRecords) {
				str_info += opts.lang.totalRecordsBeforeText + '<span class="totalRecordNum">' + opts.totalRecords + '</span>' + opts.lang.totalRecordsAfterText;
			}
			str_info += '</span>';
			var str_mid = '';
			//分页处理
			var i = 1;
			var interval = methods._getInterval(opts);
			//Generate start edges
			if(opts.mode === 'ellipsis' && interval.start > 1 && opts.edges > 0) {
				if(opts.edges < interval.start) {
					if(interval.start - opts.edges == 1 || interval.start - opts.edges == 2) {
						for(; i < interval.start; i++) {
							str_mid += '<a data-index="'+ i +'">' + i + '</a>';
						}
					}
					else {
						for(; i <= opts.edges; i++) {
							str_mid += '<a data-index="'+ i +'">' + i + '</a>';
						}
						str_mid += '<span class="ellipsis">' + opts.ellipsisText + '</span>';
					}
				}
				else if(opts.edges == interval.start) {
					for(; i < opts.edges; i++) {
						str_mid += '<a data-index="'+ i +'">' + i + '</a>';
					}
				}

			}
			//Generate interval links
			for(i = interval.start; i <= interval.end; i++ ) {
				if(opts.pageNo == i) {
					str_mid += '<span class="curr">' + i + '</span>';
				}
				else {
					str_mid += '<a data-index="'+ i +'">' + i + '</a>';
				}
			}

			//Generate end edges
			if(opts.mode === 'ellipsis' && interval.end < opts.totalPages && opts.edges > 0) {
				if(opts.totalPages - opts.edges > interval.end && (opts.totalPages - opts.edges - interval.end != 1)) {
					str_mid += '<span class="ellipsis">' + opts.ellipsisText + '</span>';
				}
				else if(opts.totalPages - opts.edges - interval.end == 1) {
					str_mid += '<a data-index="'+ (interval.end + 1) +'">' + (++interval.end) + '</a>';
				}
				var end_edges_start = Math.max(opts.totalPages - opts.edges, interval.end);
				for(i = end_edges_start; i < opts.totalPages; i++) {
					str_mid += '<a data-index="'+ (i + 1) +'">' + (i + 1) + '</a>';
				}
			}

			var pageHtml = '<div class="' + opts.wrapCls + '">';
			if(opts.totalPages != 0 && opts.totalPages != 1) {
				if(opts.isWrapedPageBtns) {
					pageHtml += '<span class="pageBtnWrap">' + str_first + str_prev + str_mid + str_next + str_last + '</span>';
				}
				else {
					pageHtml += str_first + str_prev + str_mid + str_next + str_last;
				}
			}
			if(opts.isWrapedInfo) {
				pageHtml += '<span class="infoWrap">' + str_info + '</span>';
			}
			else {
				pageHtml += str_info;
			}
			pageHtml += '</div><div style="clear:both"></div>'
			this.html(pageHtml);
		},
		_getTotalPages: function(opts) {
			if(!opts.totalRecords || opts.totalRecords == 0) {
				return 0;
			}
			else {
				return Math.ceil(opts.totalRecords / opts.pageSize);
			}
		},
		_getInterval: function(opts) {
			var start = 0, end = 0, 
				pageNo = opts.pageNo, 
				totalPages = opts.totalPages,
				displayPages = opts.displayPages,
				half = displayPages == 1 ? 1 : (Math.floor(displayPages / 2) + 1);
			if(pageNo <= half) {
				start = 1;
				end = Math.min(displayPages, totalPages);
				
			}
			else {
				start = 1 + pageNo - half;
				end = start + displayPages -1;
				if(end > totalPages) {
					var tempStart = totalPages - displayPages + 1;
					start = tempStart > 0 ? tempStart : 1;
					end = totalPages;
				}

			}
			return {
				start: start,
				end: end
			}
		}
	}

	$.fn.paging = function(method) {
		if(methods[method]) {
			return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
		}
		else if(typeof method === 'object' || !method) {
			return methods.init.apply(this, arguments);
		}
		else {
			$.error('Method ' + method + ' does not exist on jQuery.paging');
		}
	}

})(jQuery, window, document);