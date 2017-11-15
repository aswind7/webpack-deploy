<template>
	<div class="fl user-avatar interface-avatar-upload">
		<div class="user-avatar-w clearfix" style="margin-top: 10px;">
			<img :src="preview_img_url" alt="" class="display_user_img" ref="display_user_img">
		</div>
		<div class="desc fs12 c999 tac m0a" style="width: 110px;    line-height: 18px;
		margin: 4px auto;">
		请上传一张本地图片
		<br> 大小不超过{{msg}}M
	</div>
	<label class="primary-btn m0a db">
		更改头像
		<input type="file" accept="image/png,image/jpeg" class="dn select" @change="haveSelected($event)" ref="select">
	</label>
	<div class="changeAvatarBox" v-if="showCrop">
		<div class="changeAvatarBox-title">
			<div class="line1">编辑头像</div>
			<div class="line2">调整头像尺寸和位置</div>
		</div>
		<div class="adjust-wrap-border">
			<div class="adjust-wrap">
				<img src="" alt="" id="doDropImg">
			</div>
		</div>
		<div class="primary-btn active" @click="saveAvatar">
			保存
		</div>
		<div class="icon-close" @click="hideAll"></div>
	</div>
</div>
</template>
<script>
	import Common from "../common.js"
	const mask = document.querySelector(".g-page-mask");
	export default {
		data() {
			return {
			preview_img_url: JSON.parse(JSON.stringify(this.avatarUrl)), //base64 最终预览
			crop_img_url: "", // 裁剪选择
			cropper: null,
			msg: 2,
			showCrop: false // 是否显示裁剪界面
		}
	},
	components: {},
	mounted() {
	},
	props: ["data-url", "avatar-url"],
	methods: {
		haveSelected(event) {
			console.log("haveSelected");
			console.log(event);
			const self = this;
				// 弹出层
				mask.style.display = "block";
				self.showCrop = true;

				let fileReaderHandler = function(event) {
					const result = document.querySelector(".result");
					const file = event.target.files[0];
					const reader = new FileReader();

					reader.onload = function(event) {
						// 结果
						self.crop_img_url = reader.result;
						// console.log(self.crop_img_url);
						self.doCrop();
					};
					// 解析文件之后  会触发onLoad事假
					reader.readAsDataURL(file);
				};
				fileReaderHandler(event);
			},
			doCrop() { //裁剪操作
				const self = this;
				// return;
				let image = document.getElementById('doDropImg');
				// var image = self.$refs.doDropImg;
				image.src = self.crop_img_url;
				self.cropper = new window.Cropper(image, {
					viewMode: 1,
					dragMode: 'move',
					aspectRatio: 1 / 1,
					autoCropArea: 0.75,
					restore: false,
					guides: false,
					center: false,
					highlight: false,
					cropBoxMovable: false,
					cropBoxResizable: false,
					minCropBoxWidth: 195,
					// minCanvasWidth: 257,
					minCanvasHeight: 195,
					// toggleDragModeOnDblclick: false
					ready: function() {
						// const btn = document.querySelector(".changeAvatarBox .primary-btn");
					}
				});
			},
			hideAll() {
				mask.style.display = "none";
				this.showCrop = false;
				this.cropper.destroy();
			},
			saveAvatar() { //保存头像
				let self = this;
				let result_canvas;
				let result_base64;

				result_canvas = this.cropper.getCroppedCanvas();
				//图片质量0.4
				result_base64 = result_canvas.toDataURL("image/jpeg", 0.4);
				// console.log(result_canvas);
				let options = {};
				options.imgbase64 = result_base64;
				let url = self.dataUrl;
				// console.log();

				console.log(url);
				console.log(options);
				Common.showLoadingModal("图片上传中...");
				// 传ajax
				$.ajax({
					url: url,
					type: 'POST',
					data: options
				})
				.done(function(res){
					if (res.code == 1) {
						// self.preview_img_url = res.data.url;
						self.showCrop = false;
						self.preview_img_url = res.data.url;
						//传递给父组件
						self.$emit("update-all-avatar", res.data.url);
					}
					Common.hideLoadingModal();
					Common.showTip(res.msg);
				})
				.fail(function() {
					Common.showTip("ajax error");
				})
			}
		}
	}
</script>