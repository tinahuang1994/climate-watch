module Api
  module V1
    class NdcFullTextsController < ApiController
      def index
        @ndcs = Ndc.includes(:location)
        @ndcs = apply_query_with_highlights(@ndcs, false)
        render json: @ndcs, each_serializer: Api::V1::NdcFullTextSearchResultSerializer, query: params[:query]
      end

      def show
        ndcs = Ndc.joins(:location).where(
          'locations.iso_code3' => params[:code].upcase
        )
        ndcs = apply_query_with_highlights(ndcs, true)
        @ndc = ndcs.first
        render status: :not_found and return unless @ndc
        #render html: @ndc.pg_search_highlight.html_safe
        render json: @ndc, serializer: Api::V1::NdcFullTextSerializer, query: params[:query]
      end

      private

      def apply_query_with_highlights(ndcs, highlights_in_full = false)
        if params[:query]
          ndcs =
            if highlights_in_full
              ndcs.with_highlights_in_full(params[:query])
            else
              ndcs.with_highlights_in_fragments(params[:query])
            end
          ndcs = ndcs.with_pg_search_highlight
        end
        ndcs
      end
    end
  end
end
