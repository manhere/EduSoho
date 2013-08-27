define(function(require, exports, module) {

	var Notify = require('common/bootstrap-notify');

    module.exports = function($container) {
        $container.on('click', '[data-role=batch-delete]', function() {
        	var $btn = $(this);
        		name = $btn.data('name');

            var ids = [];
            $container.find('[data-role=batch-item]:checked').each(function(){
                ids.push(this.value);
            });

            if (ids.length == 0) {
                Notify.danger('未选中任何' + name);
                return ;
            }

            if (!confirm('这的要删除选中的' + ids.length + '条' + name + '吗？')) {
                return ;
            }

            $container.find('.btn').addClass('disabled');

            Notify.info('正在删除' + name + '，请稍等。', 60);

            $.post($btn.data('url'), {ids:ids}, function(){
            	window.location.reload();
            });

        });

    };

});