from elasticsearch_dsl import Q


class ArticleFilter:
    def filter(self, search, value):
        raise NotImplementedError("Subclasses must implement the apply method.")


class KeywordsFilter(ArticleFilter):
    def filter(self, search, keywords):
        should_queries = [
            Q('match', keywords={'query': keyword, 'fuzziness': 'AUTO'}) for keyword in keywords
        ]
        return search.query('bool', should=should_queries)


class AuthorsFilter(ArticleFilter):
    def filter(self, search, authors):
        should_queries = [
            Q('match', meta_data__authors__name={'query': keyword, 'fuzziness': 'AUTO'}) for keyword in authors
        ]
        return search.query('bool', should=should_queries)


class InstitutionsFilter(ArticleFilter):
    def filter(self, search, institutions):
        return search.query('match', meta_data__institutions__name=institutions)


class DateRangeFilter(ArticleFilter):
    def filter(self, search, period):
        return search.filter('range', meta_data__pub_date={'gte': period[0], 'lte': period[1]})
