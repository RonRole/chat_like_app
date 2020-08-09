module FailResultHelper
    #登録失敗時のエラーメッセージをパラメータ名とエラーメッセージを組にしたハッシュにして返す
    def fail_result
        result = self.errors.keys.each_with_object({isFail: true}) do |param_name, hash|
            hash[param_name] = self.errors.full_messages_for(param_name)
        end
    end
end