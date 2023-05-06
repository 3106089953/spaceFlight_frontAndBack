package com.xiao.spaceflight.pojo;

/**
 * 实现分页功能
 *
 * @author ：小肖
 * @date ：Created in 2022/3/18 22:22
 */
public class Page {

    // 当前页
    private Integer current = 1;

    /**
     * 这里的话是用来控制每页显示帖子的条数，这里直接给的定值
     */
    // 显示一页中帖子上限数量
    private Integer limit = 5;

    // 帖子总数 (用于计算总页数)
    private Integer rows;

    // 查询路径，便于复用
    private String path;

    public Integer getCurrent() {
        return current;
    }

    public void setCurrent(Integer current) {
        if (current >= 1) {
            this.current = current;
        }
    }

    public Integer getLimit() {
        return limit;
    }

    public void setLimit(Integer limit) {
        if (limit >= 1 && limit <= 100) {
            this.limit = limit;
        }
    }

    public Integer getRows() {
        return rows;
    }

    public void setRows(Integer rows) {
        if (rows >= 0) {
            this.rows = rows;
        }
    }

    public String getPath() {
        return path;
    }

    public void setPath(String path) {
        this.path = path;
    }

    /**
     * 返回当前页的起始页
     *
     * @return
     */
    public Integer getOffset() {
        return (current - 1) * limit;
    }

    /**
     * 返回总页数
     *
     * @return
     */
    public Integer getTotal() {
        if (rows % limit == 0) {
            return rows / limit;
        } else {
            return rows / limit + 1;
        }
    }

    /**
     * 获取当前页码的前面两页
     *
     * @return
     */
    public Integer getFrom() {
        int from = current - 2;
        return from < 1 ? 1 : from;
    }

    /**
     * 获取当前页的后面两页
     *
     * @return
     */
    public Integer getTo() {
        int to = current + 2;
        int total = getTotal();
        return to > total ? total : to;
    }
}
