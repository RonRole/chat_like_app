module NewsHelper
    def news_params
        params.require(news_symbol).permit(news_required_params)
    end

    def news_class
        params[:type].constantize
    end

    private
        def news_symbol
            params[:type].underscore.to_sym
        end

        def news_required_params
            news_class.column_names.map(&:to_sym) - %i(id created_at updated_at)
        end
    
end
