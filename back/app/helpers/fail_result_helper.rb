module FailResultHelper
    #登録失敗時のエラーメッセージをパラメータ名とエラーメッセージを組にしたハッシュにして返す
    def fail_result
        fail_result = {isFail:true}
        self.errors.each do |name|
            fail_result[name] = self.errors.full_messages_for(name)
        end
        fail_result
    end
end